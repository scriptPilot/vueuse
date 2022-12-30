<template>
  <f7-page>
    <f7-navbar back-link title="Hello World"></f7-navbar>
    <f7-list inset>
      <f7-list-input v-model:value="name" placeholder="Your name ..."></f7-list-input>
      <f7-list-button @click="greet({ name })">Log "Hello {{name || 'User'}}"</f7-list-button>
    </f7-list>
  </f7-page>
</template>
<script setup>
  import { useHelloWorld } from '../composables'
  const name = ref('')
  const { greet } = useHelloWorld()
</script>