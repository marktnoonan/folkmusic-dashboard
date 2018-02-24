<template>
  <div>
    <h2>
      Hi, {{state.username}}.
    </h2>

    <button @click="logUser">Log User</button>
  </div>
</template>

<script>
import UserStore from '../stores/UserStore.js'

  export default {
    data() {
      return {
        state: UserStore.state
      }
    },
      created() {   
      console.log("when created, user is: " + this.state.username)
  },
  methods: {
    logUser(){
      UserStore.set("username","cake")
      console.log("user is: " + this.state.username)      
      this.$forceUpdate()
    }
  }
  }
</script>

<style scoped>

</style>