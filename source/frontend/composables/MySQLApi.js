import { v4 as uuid }  from 'uuid'

export function useMySQLAPI (options) {

  options = options || {}  
  const apiUrl = options.apiUrl || import.meta.env.DEV ? 'http://localhost:8000/api.php' : '/api.php'

  function apiRequest ({ path, method = 'GET', data = undefined }) {
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

  function isAvailable () {
    return navigator.onLine
  }

  function createDoc ({ table, doc }) {
    return new Promise((resolve, reject) => {
      apiRequest({ path: table, method: 'POST', data: doc })
        .then(key => {
          resolve(key)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function updateDoc ({ table, key, updates }) {
    return new Promise((resolve, reject) => {
      apiRequest({ path: table + '/' + key, method: 'PUT', data: updates })
        .then(updatedRows => {
          if (parseInt(updatedRows) === 1) {
            resolve(key)
          } else {
            reject(new Error('Multiple rows updated.'))
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function deleteDoc ({ table, key }) {
    return new Promise((resolve, reject) => {
      apiRequest({ path: table + '/' + key, method: 'DELETE' })
        .then(deletedRows => {
          if (parseInt(deletedRows) === 1) {
            resolve(key)
          } else {
            reject(new Error('Multiple rows deleted.'))
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function getDoc ({ table, key }) {
    return new Promise((resolve, reject) => {
      apiRequest({ path: table + '/' + key })
        .then(remoteDoc => {
          resolve(remoteDoc)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  function getCollection ({ path }) {
    return new Promise((resolve, reject) => {
      apiRequest({ path })
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
    getCollection,
    uuid
  }
}
