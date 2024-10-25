import { reactive, readonly } from 'vue'
import { useLocalStorage } from './LocalStorage'
import { v4 as uuid } from 'uuid'

export function useCollection (options) {
  options = options || {}
  const { localStorageKey = null, primaryKey = '$key' } = options

  let docs

  if (localStorageKey) {
    const { state } = useLocalStorage({ localStorageKey, defaultValue: [] })
    docs = state
  } else {
    docs = reactive([])
  }

  function addDoc ({ doc }) {
    if (!doc[primaryKey]) doc[primaryKey] = uuid()
    docs.push({ ...doc })
  }

  function updateDoc ({ key, updates }) {
    for (let n = 0; n < docs.length; n++) {
      if (docs[n][primaryKey] === key) {
        docs.splice(n, 1, { ...docs[n], ...updates })
      }
    }
  }

  function removeDoc ({ key }) {
    for (let n = 0; n < docs.length; n++) {
      if (docs[n][primaryKey] === key) {
        docs.splice(n, 1)
      }
    }
  }

  function setDocs ({ docs: newDocs }) {
    for (let n = 0; n < newDocs.length; n++) {
      if (!newDocs[n][primaryKey]) newDocs[n][primaryKey] = uuid()
    }
    docs.splice(0, docs.length, ...newDocs)
  }

  return {
    documents: readonly(docs),
    addDoc,
    updateDoc,
    removeDoc,
    setDocs
  }
}
