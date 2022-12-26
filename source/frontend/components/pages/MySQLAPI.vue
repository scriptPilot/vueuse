<template>
  <f7-page>
    <f7-navbar back-link title="MySQL API"></f7-navbar>
    <f7-block>
      <f7-button @click="addDoc({ title: 'Click to increase the badge', badge: 0 })">Add Doc</f7-button>
    </f7-block>
    <f7-list v-if="documents.length">
      <f7-list-item
        v-for="doc in documents"
        :title="doc.title"
        :badge="doc.badge"
        @click="updateDoc(doc, { badge: doc.badge + 1 })"
        :key="doc.id"
      >
        <f7-button color="red" @click="removeDoc(doc)">Delete</f7-button>
      </f7-list-item>
    </f7-list>
    <f7-block v-if="documents.length">
      The collection will survive a page refresh.
    </f7-block>
  </f7-page>
</template>
<script setup>
  import { useMySQLAPI, useCollection } from '../../composables'

  const apiUrl = import.meta.env.DEV ? 'http://localhost:8000/api.php' : '/api.php'
  const api = useMySQLAPI(apiUrl)

  const collection = useCollection()

  let documents = collection.documents

  function addDoc(doc) {
    api.createDoc('collection', doc)
      .then(id => {
        collection.addDoc({ ...doc, id })
      })
  }

  function updateDoc(doc, updates) {
    api.updateDoc('collection', doc.id, { ...doc, ...updates })
      .then(() => {
        collection.updateDoc(doc, updates)
      })
  }

  function removeDoc(doc) {
    api.deleteDoc('collection', doc.id)
      .then(() => {
        collection.removeDoc(doc)
      })
  }
</script>