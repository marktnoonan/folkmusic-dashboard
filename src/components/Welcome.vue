<template>
  <div>
    <h2>
      Hi, {{username}}.
    </h2>
  </div>
</template>

<script>
import UserStore from '../stores/UserStore.js'

  export default {
    data() {
      return {
        username: UserStore.data.username
      }
    }
  }
</script>

<style scoped>

</style>