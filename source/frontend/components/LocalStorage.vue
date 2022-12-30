<template>
  <f7-page>
    <f7-navbar title="Local Storage" back-link></f7-navbar>
    <f7-block-title>Boolean</f7-block-title>
    <f7-list>
      <f7-list-item title="Toggle">
        <f7-toggle v-model:checked="toggle"></f7-toggle>
      </f7-list-item>
    </f7-list>
    <f7-block-title>String</f7-block-title>
    <f7-list>
      <f7-list-input v-model:value="text" title="Text"></f7-list-input>
    </f7-list>
    <f7-block-title>Object</f7-block-title>
    <f7-list>
      <f7-list-item checkbox v-model:checked="boxes.first" title="First Box"></f7-list-item>
      <f7-list-item checkbox v-model:checked="boxes.second" title="Second Box"></f7-list-item>
      <f7-list-item checkbox v-model:checked="boxes.third" title="Third Box"></f7-list-item>
    </f7-list>
    <f7-block-title>Array</f7-block-title>
    <f7-list>
      <f7-list-button @click="array.push('New Element')">Add Element</f7-list-button>
      <f7-list-item v-for="title in array" :title="title"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script setup>
  import { useLocalStorage } from '../composables'
  const toggle = useLocalStorage('toggle', false)
  const text = useLocalStorage('text', 'Initial text')
  const boxes = useLocalStorage('boxes', { first: true, second: false, third: true })
  const array = useLocalStorage('array', [])
</script>