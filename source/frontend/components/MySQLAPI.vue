<template>
  <p v-html="message" />
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
                this.message = `<a href="${apiUrl}/${id}">open record</a>`
              })
          })
      }, 1000)
    }
  }
</script>