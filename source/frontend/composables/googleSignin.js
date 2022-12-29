/*

  Purpose: Provide signin functionality to Google
  Getters: token
  Methods: signin

*/

export function useGoogleSignin({ clientId, redirectUrl, scope, onSignin }) {
  // Build signin URL
  const endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
  const params = {
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: 'token',
    scope: Array.isArray(scope) ? scope.join(' ') : typeof scope === 'string' ? scope : '',
    include_granted_scopes: true
  }
  const signinUrl = endpoint + '?' + Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&')
  // Signin function
  function signin() {
    window.location.href = signinUrl
  }
  // Token
  const token = ref(null)
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  if (hashParams.has('access_token')) token.value = hashParams.get('access_token')
  // Return signin function and token
  return {
    signin,
    token
  }
}