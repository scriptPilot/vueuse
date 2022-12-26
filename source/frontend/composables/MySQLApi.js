/*

  Purpose: MySQL API Wrapper (api.php - https://github.com/mevdschee/php-crud-api)
  Option:
  - apiUrl (api.php endpoint, e.g. import.meta.env.DEV ? 'http://localhost:8000/api.php' : '/api.php')
  Methods:
  - isAvailable() => boolean
  - apiRequest(path, method = GET, data = undefined) => Promise => json
  - createDoc(collection, doc) => Promise => id
  - updateDoc(collection, id, doc) => Promise => id
  - deleteDoc(collection, id) => Promise => id
  - getDoc(collection, id) => Promise => doc
  - getCollection(path) => Promise => docs

*/

export function useMySQLAPI (apiUrl = '/api.php') {
  function isAvailable () {
    return navigator.onLine
  }

  function apiRequest (path, method = 'GET', data = undefined) {
    return new Promise((resolve, reject) => {
      fetch(apiUrl + '/records/' + path, { method, body: JSON.stringify(data) })
        .then(response => {
          response.text()
            .then(text => {
              try {
                const json = JSON.parse(text)
                if (!json.code && !json.message) {
                  resolve(json)
                } else {
                  reject(json)
                }
              } catch (error) {
                reject(error)
              }
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function createDoc (collection, doc) {
    return new Promise((resolve, reject) => {
      apiRequest(collection, 'POST', doc)
        .then(id => {
          resolve(id)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function updateDoc (collection, id, doc) {
    return new Promise((resolve, reject) => {
      apiRequest(collection + '/' + id, 'PUT', doc)
        .then(updatedRows => {
          if (updatedRows === 1) {
            resolve(id)
          } else {
            reject(updatedRows)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function deleteDoc (collection, id) {
    return new Promise((resolve, reject) => {
      apiRequest(collection + '/' + id, 'DELETE')
        .then(deletedRows => {
          if (deletedRows === 1) {
            resolve(id)
          } else {
            reject(deletedRows)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function getDoc (collection, id) {
    return new Promise((resolve, reject) => {
      apiRequest(collection + '/' + id)
        .then(remoteDoc => {
          resolve(remoteDoc)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function getCollection (path) {
    return new Promise((resolve, reject) => {
      apiRequest(path)
        .then(data => {
          resolve(data.records)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  return {
    isAvailable,
    apiRequest,
    createDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getCollection
  }
}
