<template>
  <f7-page>
    <f7-navbar title="Google Auth" back-link></f7-navbar>
    <f7-block>
      <f7-button @click="signIn" v-if="!token">Sign-in</f7-button>
      <f7-button @click="signOut" v-if="token">Sign-out</f7-button>
      <p v-if="token">Token: {{ token }}</p>
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