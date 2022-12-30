<template>
  <f7-page>
    <f7-navbar back-link title="MySQL API"></f7-navbar>
    <f7-block inset>
      <f7-button @click="addDoc({ title: 'Increase the badge if you like', badge: 0 })">Add Doc</f7-button>
    </f7-block>
    <f7-list v-if="documents.length" inset>
      <f7-list-item
        v-for="doc in documents"
        :title="doc.title"
        :badge="doc.badge || '0'"
        :key="doc.id"
      >
        <f7-button color="blue" @click="updateDoc(doc, { badge: doc.badge + 1 })">Increase</f7-button>
        <f7-button color="red" @click="removeDoc(doc)">Delete</f7-button>
      </f7-list-item>
    </f7-list>
    <f7-block v-if="documents.length" inset>
      The collection will survive a page refresh.
    </f7-block>
  </f7-page>
</template>
<script setup>
  import { useMySQLAPI, useCollection } from '../composables'
  const api = useMySQLAPI()

  const collection = useCollection({ primaryKey: 'id' })

  let documents = collection.documents

  function addDoc(doc) {
    api.createDoc({ table: 'collection', doc })
      .then(id => {
        collection.addDoc({ doc: { ...doc, id } })
      })
  }

  function updateDoc(doc, updates) {
    api.updateDoc({ table: 'collection', key: doc.id, updates: { ...doc, ...updates } })
      .then(() => {
        collection.updateDoc({ key: doc.id, updates })
      })
  }

  function removeDoc(doc) {
    api.deleteDoc({ table: 'collection', key: doc.id })
      .then(() => {
        collection.removeDoc({ key: doc.id })
      })
  }

  onMounted(() => {
    api.getCollection({ path: 'collection' })
      .then(docs => {
        collection.setDocs({ docs })
      })
  })
</script>