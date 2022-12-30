<template>
  <f7-page>
    <f7-navbar back-link title="MySQL Collection"></f7-navbar>
    <f7-block inset>
      <f7-button @click="addDoc({ doc: { title: 'Increase the badge if you like', badge: 0 }})">Add Doc</f7-button>
    </f7-block>
    <f7-list v-if="documents.length" inset>
      <f7-list-item
        v-for="doc in documents"
        :title="doc.title"
        :badge="doc.badge || '0'"
        :key="doc.id"
      >
        <f7-button color="blue" @click="updateDoc({ key: doc.$key, updates: { badge: doc.badge + 1 }})">Increase</f7-button>
        <f7-button color="red" @click="removeDoc({ key: doc.$key })">Delete</f7-button>
      </f7-list-item>
    </f7-list>
    <f7-block v-if="documents.length" inset>
      The collection will survive a page refresh.
    </f7-block>
  </f7-page>
</template>
<script setup>
  import { useMySQLCollection } from '../composables'
  const { documents, addDoc, updateDoc, removeDoc } = useMySQLCollection({ syncTable: 'syncCollection', localStorageKey: 'syncCollection' })
</script>