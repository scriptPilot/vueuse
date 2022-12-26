/*
  Purpose: Collection Model with MySQL Database Sync
  Requirements:
  - Composables: useMySQLAPI, useCollection
  - Table Fields:
    `$id` varchar(36) NOT NULL, (or any other $id or id field)
    `$updated` bigint(14) NOT NULL,
    `$synchronized` bigint(14) NOT NULL,
    `$deleted` tinyint(1) NOT NULL DEFAULT 0,
  Options: apiUrl, localStorageKey, syncTable, syncInterval, syncStatus
  Getters: documents
  Methods: addDoc(doc), updateDoc(doc, updates), removeDoc(doc), runSync, startSync, stopSync
*/

import { useCollection } from './Collection'
import { useMySQLAPI } from './MySQLAPI'

export function useMySQLCollection (options) {
  // Validate options
  const { apiUrl, localStorageKey, syncTable, syncInterval, syncStatus } = options || {}
  if (!syncTable) throw new Error('"syncTable" option is missing.')
  // Use Collection
  const collection = useCollection({ localStorageKey })
  // Use MySQL API
  const api = useMySQLAPI(apiUrl)
  // Set internal values
  const interval = typeof syncInterval === 'number' ? syncInterval : 1000
  let isActive = typeof syncStatus === 'boolean' ? syncStatus : true
  let lastUpdate = 0
  // Redefine collection functions
  function addDoc (doc) {
    return collection.addDoc({ $updated: Date.now(), $synchronized: false, ...doc })
  }
  function updateDoc (doc, updates) {
    return collection.updateDoc(doc, { $updated: Date.now(), $synchronized: false, ...updates })
  }
  function removeDoc (doc) {
    return updateDoc(doc, { $deleted: Date.now() })
  }
  function realRemoveDoc (doc) {
    return collection.removeDoc(doc)
  }
  async function runSync () {
    if (isActive) {
      // API is available
      if (api.isAvailable()) {
        console.log('Sync started')
        // Fetch remote documents for sync to local
        const now = Date.now()
        const updatedFilter = '?filter1=$updated,gt,' + lastUpdate + '&filter2=$synchronized,gt,' + lastUpdate
        const deletedFilter = lastUpdate === 0 ? '&filter=$deleted,eq,0' : ''
        await api.getCollection(syncTable + updatedFilter + deletedFilter)
          .then(remoteCollection => {
            // Create object with local updates
            const docUpdates = {}
            collection.documents.forEach(doc => {
              docUpdates[doc.$id || doc.id] = doc.$updated
            })
            // Loop remote documents
            remoteCollection.forEach(doc => {
              // Remote document not found locally but deletion flag > skip
              if (!docUpdates[doc.$id || doc.id] && doc.$deleted) {
                console.log('skipped remote', JSON.stringify(doc))
              // Remote document not found locally and no deletion flag > create
              } else if (!docUpdates[doc.$id || doc.id] && !doc.$deleted) {
                const newDoc = { ...doc, $synchronized: Date.now() }
                addDoc(newDoc)
                console.log('created local', JSON.stringify(newDoc))
              // Remote update newer than local one but deletion flag > delete
              } else if (doc.$updated > docUpdates[doc.$id || doc.id] && doc.$deleted) {
                realRemoveDoc(doc)
                console.log('deleted local', JSON.stringify(doc))
              // Remote update newer than local one > update
              } else if (doc.$updated > docUpdates[doc.$id || doc.id]) {
                const updatedDoc = { ...doc, $synchronized: Date.now() }
                updateDoc(doc, updatedDoc)
                console.log('updated local', JSON.stringify(updatedDoc))
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
            await api.updateDoc(syncTable, doc.$id || doc.id, remoteDoc)
              .then(() => {
                console.log('then')
                // Remember successful sync
                updateDoc(doc, { $updated: doc.$updated, $synchronized: Date.now() })
                console.log('updated remote', JSON.stringify(remoteDoc))
                // Delete locally after synchronization
                if (doc.$deleted) {
                  realRemoveDoc(doc)
                  console.log('deleted local', JSON.stringify(doc))
                }
              })
              // Create remote document if update failed
              .catch(async () => {
                // Create remote document (if no deletion flag is set)
                if (!doc.$deleted) {
                  console.log('createDoc', syncTable, remoteDoc)
                  await api.createDoc(syncTable, remoteDoc)
                    .then(() => {
                      // Remember successful sync
                      updateDoc(doc, { $updated: doc.$updated, $synchronized: Date.now() })
                      console.log('created remote', JSON.stringify(remoteDoc))
                    })
                } else {
                  // Delete doc locally
                  realRemoveDoc(doc)
                  console.log('deleted local', JSON.stringify(doc))
                }
              })
          }
        }
      // API not available
      } else {
        console.log('Sync skipped, API not available')
      }
      setTimeout(() => {
        runSync()
      }, interval)
    }
  }

  function startSync () {
    isActive = true
    console.log('Sync activated')
    runSync()
  }

  function stopSync () {
    isActive = false
    console.log('Sync deactivated')
  }

  if (isActive) runSync()

  return {
    documents: collection.documents,
    addDoc,
    updateDoc,
    removeDoc,
    runSync,
    startSync,
    stopSync
  }
}
