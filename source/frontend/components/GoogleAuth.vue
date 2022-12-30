<template>
  <f7-page>
    <f7-navbar title="Google Auth" back-link></f7-navbar>
    <f7-block inset v-if="token">
      <p><strong>Token</strong>: {{ token }}</p>
    </f7-block>
    <f7-block inset>
      <f7-button @click="signIn" v-if="!token">Sign-in</f7-button>
      <f7-button @click="signOut" v-if="token" color="red">Sign-out</f7-button>
    </f7-block>
  </f7-page>
</template>
<script setup>
  import { useGoogleAuth } from '../composables'
  import credentials from '../credentials'
  const { googleClientId: clientId, googleClientSecret: clientSecret } = credentials
  const scope = 'https://www.googleapis.com/auth/drive'
  const { token, signIn, signOut } = useGoogleAuth({ clientId, clientSecret, scope })
</script>