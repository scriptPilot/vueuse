import { useCollection } from './Collection'
import { useMySQLAPI } from './MySQLAPI'

export function useMySQLCollection (options) {
  // Validate options
  options = options || {}
  const { apiUrl, localStorageKey, primaryKey = '$key', syncTable, syncFilter, syncInterval, syncStatus } = options
  if (!syncTable) throw new Error('"syncTable" option is missing.')
  // Use Collection
  const collection = useCollection({ localStorageKey, primaryKey })
  // Use MySQL API
  const api = useMySQLAPI({ apiUrl })
  // Set internal values
  const interval = typeof syncInterval === 'number' ? syncInterval : 1000
  let isActive = typeof syncStatus === 'boolean' ? syncStatus : true
  let lastUpdate = 0
  // Redefine collection functions
  function addDoc ({ doc }) {
    return collection.addDoc({ doc: { $updated: Date.now(), $synchronized: false, ...doc } })
  }
  function updateDoc ({ key, updates }) {
    return collection.updateDoc({ key, updates: { $updated: Date.now(), $synchronized: false, ...updates } })
  }
  function removeDoc ({ key }) {
    return updateDoc({ key, updates: { $deleted: Date.now() } })
  }
  function realRemoveDoc ({ key }) {
    return collection.removeDoc({ key })
  }
  function setDocs ({ docs }) {
    return collection.setDocs({ docs })
  }
  async function runSync () {
    if (isActive) {
      // API is available
      if (api.isAvailable()) {
        console.debug('Sync started')
        // Fetch remote documents for sync to local
        const now = Date.now()
        const updatedFilter = 'filter1=$updated,gt,' + lastUpdate + '&filter2=$synchronized,gt,' + lastUpdate
        const deletedFilter = lastUpdate === 0 ? '&filter=$deleted,eq,0' : ''
        await api.getCollection({ path: syncTable + '?' + (syncFilter ? syncFilter + '&' : '') + updatedFilter + deletedFilter })
          .then(remoteCollection => {
            // Create object with local updates
            const docUpdates = {}
            collection.documents.forEach(doc => {
              docUpdates[doc[primaryKey]] = doc.$updated
            })
            // Loop remote documents
            remoteCollection.forEach(doc => {
              // Remote document not found locally but deletion flag > skip
              if (!docUpdates[doc[primaryKey]] && doc.$deleted) {
                console.debug('skipped remote', JSON.stringify(doc))
              // Remote document not found locally and no deletion flag > create
              } else if (!docUpdates[doc[primaryKey]] && !doc.$deleted) {
                const newDoc = { ...doc, $synchronized: Date.now() }
                addDoc({ doc: newDoc })
                console.debug('created local', JSON.stringify(newDoc))
              // Remote update newer than local one but deletion flag > delete
              } else if (doc.$updated > docUpdates[doc[primaryKey]] && doc.$deleted) {
                realRemoveDoc({ key: doc[primaryKey] })
                console.debug('deleted local', JSON.stringify(doc))
              // Remote update newer than local one > update
              } else if (doc.$updated > docUpdates[doc[primaryKey]]) {
                const updatedDoc = { ...doc, $synchronized: Date.now() }
                updateDoc({ key: doc[primaryKey], updates: updatedDoc })
                console.debug('updated local', JSON.stringify(updatedDoc))
              }
            })
            lastUpdate = now
          })
        // Loop local documents for sync to remote
        for (let n = 0; n < collection.documents.length; n++) {
          const doc = collection.documents[n]
          // Not synchronized yet
          if (!doc.$synchronized) {
            const remoteDoc = { ...doc, $synchronized: Date.now() }
            // Try update remote document first
            await api.updateDoc({ table: syncTable, key: doc[primaryKey], updates: remoteDoc })
              .then(() => {
                console.debug('then')
                // Remember successful sync
                updateDoc({ key: doc[primaryKey], updates: { $updated: doc.$updated, $synchronized: Date.now() } })
                console.debug('updated remote', JSON.stringify(remoteDoc))
                // Delete locally after synchronization
                if (doc.$deleted) {
                  realRemoveDoc({ key: doc[primaryKey] })
                  console.debug('deleted local', JSON.stringify(doc))
                }
              })
              // Create remote document if update failed
              .catch(async () => {
                // Create remote document (if no deletion flag is set)
                if (!doc.$deleted) {
                  console.debug('createDoc', syncTable, remoteDoc)
                  await api.createDoc({ table: syncTable, doc: remoteDoc })
                    .then(() => {
                      // Remember successful sync
                      updateDoc({ key: doc[primaryKey], updates: { $updated: doc.$updated, $synchronized: Date.now() } })
                      console.debug('created remote', JSON.stringify(remoteDoc))
                    })
                } else {
                  // Delete doc locally
                  realRemoveDoc({ key: doc[primaryKey] })
                  console.debug('deleted local', JSON.stringify(doc))
                }
              })
          }
        }
      // API not available
      } else {
        console.debug('Sync skipped, API not available')
      }
      setTimeout(() => {
        runSync()
      }, interval)
    }
  }

  function startSync () {
    isActive = true
    console.debug('Sync activated')
    runSync()
  }

  function stopSync () {
    isActive = false
    console.debug('Sync deactivated')
  }

  if (isActive) runSync()

  return {
    documents: collection.documents,
    addDoc,
    updateDoc,
    removeDoc,
    setDocs,
    runSync,
    startSync,
    stopSync
  }
}
