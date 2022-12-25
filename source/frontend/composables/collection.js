/*
  Purpose: Collection Model (collection = array of documents, document = object with properties)
  Options: localStorageKey (string, optional) to make the collection persistent
  Getters: documents
  Methods: addDoc(doc), updateDoc(doc, updates), removeDoc(doc)
*/

import { reactive, readonly } from 'vue'
import { v4 as uuid } from 'uuid'

export function useCollection (options) {
  let { localStorageKey } = options || {}
  localStorageKey = typeof localStorageKey === 'string' ? localStorageKey : null

  const docs = reactive([])

  function writeToLocalStorage () {
    if (localStorageKey) {
      window.localStorage.setItem(localStorageKey, JSON.stringify(docs))
      console.log('Write to LocalStorage')
    }
  }

  function readFromLocalStorage () {
    if (localStorageKey) {
      try {
        const localStorageValue = window.localStorage.getItem(localStorageKey)
        const localStorageJson = JSON.parse(localStorageValue)
        if (Array.isArray(localStorageJson)) {
          localStorageJson.forEach(object => docs.push(object))
          console.log('Read from LocalStorage')
        }
      } catch {}
    }
  }

  function addDoc (doc) {
    if (!doc.$id) doc.$id = uuid()
    docs.push(doc)
    writeToLocalStorage()
  }

  function updateDoc (doc, updates) {
    for (let n = 0; n < docs.length; n++) {
      if (docs[n].$id === doc.$id) docs.splice(n, 1, { ...doc, ...updates })
    }
    writeToLocalStorage()
  }

  function removeDoc (doc) {
    for (let n = 0; n < docs.length; n++) {
      if (docs[n].$id === doc.$id) docs.splice(n, 1)
    }
    writeToLocalStorage()
  }

  if (localStorageKey) readFromLocalStorage()

  return {
    documents: readonly(docs),
    addDoc,
    updateDoc,
    removeDoc
  }
}
