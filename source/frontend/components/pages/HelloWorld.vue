<template>
  <f7-page>
    <f7-navbar back-link title="Hello World"></f7-navbar>
    <f7-block>
      <f7-button fill @click="useHelloWorld">Log "Hello World"</f7-button>
    </f7-block>    
  </f7-page>
</template>
<script setup>
  import { useHelloWorld } from '../../composables'
</script>