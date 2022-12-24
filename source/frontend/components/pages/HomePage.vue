<template>
  <f7-page>
    <f7-navbar title="Home Page"></f7-navbar>
    <f7-block>
      <p>{{ message }}</p>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        message: 'Loading ...'
      }
    },
    mounted() {
      setTimeout(() => {
        const apiUrl = 'http://localhost:8000/api.php/records/collection';
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ value: 'Just created' })
          })
          .then(response => {
            response.text()
              .then(id => {
                this.message = `New record created with ID ${id}.`
              })
          })
      }, 1000)
    }
  }
</script>