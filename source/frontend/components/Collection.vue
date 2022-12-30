<template>
  <f7-page>
    <f7-navbar back-link title="Collection"></f7-navbar>
    <f7-block inset>
      <f7-button @click="addDoc({ doc: { title: 'Click to increase the badge', badge: 0 } })">Add Doc</f7-button>
    </f7-block>
    <f7-list v-if="documents.length" inset>
      <f7-list-item
        v-for="doc in documents"
        :title="doc.title"
        :badge="doc.badge"
        @click="updateDoc({ key: doc.$key, updates: { badge: doc.badge + 1 } })"
        :key="doc.$key"
      >
        <f7-button color="red" @click="removeDoc({ key: doc.$key })">Delete</f7-button>
      </f7-list-item>
    </f7-list>
    <f7-block v-if="documents.length" inset>
      The collection will survive a page refresh.
    </f7-block>
  </f7-page>
</template>
<script setup>
  import { useCollection } from '../composables'
  const { documents, addDoc, updateDoc, removeDoc } = useCollection({ localStorageKey: 'collection' })
</script>