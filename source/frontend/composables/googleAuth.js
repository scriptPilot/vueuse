import { useLocalStorage } from './LocalStorage'

export function useGoogleAuth({ clientId, clientSecret, redirectUrl, scope }) {
  
  const code = useLocalStorage('useGoogleAuth:code', null)
  const exchangedCode = useLocalStorage('useGoogleAuth:exchangedCode', null)
  const accessToken = useLocalStorage('useGoogleAuth:accessToken', null)
  const refreshToken = useLocalStorage('useGoogleAuth:refreshToken', null)

  function createUrl(endpoint, params = {}) {
    const url = new URL(endpoint)
    Object.keys(params).forEach(key => url.searchParams.set(key, params[key]))
    return url.href
  }

  function signIn() {
    return new Promise((resolve, reject) => {
      if (navigator.onLine) {  
        const signInUrl = createUrl(
          'https://accounts.google.com/o/oauth2/v2/auth',
          {
            client_id: clientId,
            redirect_uri: redirectUrl || window.location.origin,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: Array.isArray(scope) ? scope.join(' ') : scope
          }
        )
        window.location = signInUrl
        resolve()
      } else {
        reject('Sign-in not possible when offline.')
      }
    })
  }

  function handleReceivedCodeInUrl() {
    const params = new URLSearchParams(window.location.search)
    if (params.has('code') && params.get('code') !== exchangedCode.value) {
      code.value = params.get('code')   
      exchangeCode()   
    }
  }

  function exchangeCode() {
    if (code.value !== exchangedCode.value) {
      const exchangeUrl = createUrl(
        'https://www.googleapis.com/oauth2/v4/token',
        {
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUrl || window.location.origin,
          grant_type: 'authorization_code',
          code: code.value,
        }
      )
      fetch(exchangeUrl, { method: 'POST' })
        .then(response => {
          response.text()
            .then(text => {
              try {
                const json = JSON.parse(text)
                if (!json.access_token) console.error('No access token retrieved in exchange.')
                if (!json.refresh_token) console.error('No refresh token retrieved in exchange.')            
                if (!json.expires_in) console.error('No expiration retrieved in exchange.')            
                accessToken.value = json.access_token
                refreshToken.value = json.refresh_token
                setTimeout(keepTokenRefreshed, json.expires_in * 1000 / 2)
              } catch (error) {
                console.error(error, text)
              }
            })
            .catch(error => {
              console.error(error)
            })
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          exchangedCode.value = code.value
        })
    }
  }

  function keepTokenRefreshed() {
    if (refreshToken.value) {
      const refreshUrl = createUrl(
        'https://www.googleapis.com/oauth2/v4/token',
        {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken.value,
        }
      )
      fetch(refreshUrl, { method: 'POST' })
        .then(response => {
          response.text()
            .then(text => {
              try {
                const json = JSON.parse(text)
                if (!json.access_token) console.error('No access token retrieved in refresh.')
                if (!json.expires_in) console.error('No expiration retrieved in refresh.')            
                accessToken.value = json.access_token
                setTimeout(keepTokenRefreshed, json.expires_in * 1000 / 2)
              } catch(error) {
                console.error(error, text)
              }
            })
            .catch(error => {
              console.error(error)
            })
        })
        .catch(error => {
          console.error(error)
        })    
    }
  }

  function signOut() {
    accessToken.value = null
    refreshToken.value = null
  }

  handleReceivedCodeInUrl()
  keepTokenRefreshed()

  return {
    token: accessToken,
    signIn,
    signOut
  }

}