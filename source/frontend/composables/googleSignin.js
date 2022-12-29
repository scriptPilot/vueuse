/*

  Purpose: Provide signin functionality to Google
  Getters: token
  Methods: signin

  Usage:

    Create first a OAuth 2.0-Client-ID in the Google Developer Console

    --- App.vue ---

    <template>
      <button @click="signin">Signin</button>
      <p>Token: {{ token }}</p>
    </template>

    <script setup>
      import { useGoogleSignin } from '@scriptpilot/vueuse'
      const clientId = 'xxx'
      const redirectUrl = 'http://127.0.0.1:5173'
      const scope = 'https://www.googleapis.com/auth/drive.metadata.readonly'
      const { signin, token } = useGoogleSignin({ clientId, redirectUrl, scope })      
    </script>

*/

import { ref } from 'vue'

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