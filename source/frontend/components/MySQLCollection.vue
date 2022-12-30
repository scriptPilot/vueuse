<template>
  <f7-page>
    <f7-navbar back-link title="MySQL Collection"></f7-navbar>
    <f7-block>
      <f7-button @click="addDoc({ title: 'Click to increase the badge', badge: 0 })">Add Doc</f7-button>
    </f7-block>
    <f7-list v-if="documents.length">
      <f7-list-item
        v-for="doc in documents"
        :title="doc.title"
        :badge="doc.badge"
        @click="updateDoc(doc, { badge: doc.badge + 1 })"
        :key="doc.$key"
      >
        <f7-button color="red" @click="removeDoc(doc)">Delete</f7-button>
      </f7-list-item>
    </f7-list>
    <f7-block v-if="documents.length">
      The collection is synchronized with the MySQL table in realtime.
    </f7-block>
  </f7-page>
</template>
<script setup>
  import { useMySQLCollection } from '../composables'

  const apiUrl = import.meta.env.DEV ? 'http://localhost:8000/api.php' : '/api.php'
  const syncTable = 'syncCollection'
  
  const { documents, addDoc, updateDoc, removeDoc } = useMySQLCollection({ syncTable, apiUrl })
</script>