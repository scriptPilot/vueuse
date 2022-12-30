import { reactive, readonly } from 'vue'
import { v4 as uuid } from 'uuid'

export function useCollection ({ localStorageKey = null, primaryKey = '$key' }) {

  const docs = reactive([])

  function writeToLocalStorage () {
    if (localStorageKey) {
      window.localStorage.setItem(localStorageKey, JSON.stringify(docs))
      console.debug('Write to LocalStorage')
    }
  }

  function readFromLocalStorage () {
    if (localStorageKey) {
      try {
        const localStorageValue = window.localStorage.getItem(localStorageKey)
        const localStorageJson = JSON.parse(localStorageValue)
        if (Array.isArray(localStorageJson)) {
          localStorageJson.forEach(object => docs.push(object))
          console.debug('Read from LocalStorage')
        }
      } catch {}
    }
  }

  function addDoc ({ doc }) {
    if (!doc[primaryKey]) doc[primaryKey] = uuid()
    docs.push({ ...doc })
    writeToLocalStorage()
  }

  function updateDoc ({ key, updates }) {
    for (let n = 0; n < docs.length; n++) {
      if (docs[n][primaryKey] === key) {
        docs.splice(n, 1, { ...docs[n], ...updates })
      }
    }
    writeToLocalStorage()
  }

  function removeDoc ({ key }) {
    for (let n = 0; n < docs.length; n++) {
      if (docs[n][primaryKey] === key) {
        docs.splice(n, 1)
      }
    }
    writeToLocalStorage()
  }

  function setDocs ({ docs: newDocs }) {
    for (let n = 0; n < newDocs.length; n++) {
      if (!newDocs[n][primaryKey]) newDocs[n][primaryKey] = uuid()
    }
    docs.splice(0, docs.length, ...newDocs)
    writeToLocalStorage()
  }

  if (localStorageKey) readFromLocalStorage()

  return {
    documents: readonly(docs),
    addDoc,
    updateDoc,
    removeDoc,
    setDocs
  }
}
