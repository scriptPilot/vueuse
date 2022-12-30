<template>
  <f7-page>
    <f7-navbar title="Type" back-link></f7-navbar>
    <f7-block inset>
      Selected Value: <strong>{{ getType({ value: selectedValue }) }}</strong>
    </f7-block>
    <f7-list inset>
      <f7-list-item
        v-for="value in values"
        :title="value.title"  
        :text="JSON.stringify(value.value)"      
        radio
        media-item
        @click="selectedValue=value.value"
        :checked="getType({ value: selectedValue }) === getType({ value: value.value })"
        />
    </f7-list>
  </f7-page>
</template>
<script setup>
  import { useType } from '../composables'
  const { getType } = useType()
  const values = [
    {
      title: 'Undefined',
      value: undefined
    },
    {
      title: 'Null',
      value: null
    },
    {
      title: 'Array',
      value: [1, 2, 3]
    },
    {
      title: 'Object',
      value: { foo: 'bar' }
    },
    {
      title: 'String',
      value: 'Hello'
    },
    {
      title: 'Number',
      value: 123
    },
    {
      title: 'Boolean',
      value: true
    },
    {
      title: 'Error()',
      value: new Error()
    },
    {
      title: 'URL()',
      value: new URL('https://www.google.com')
    }
  ]
  const selectedValue = ref(undefined)
</script>