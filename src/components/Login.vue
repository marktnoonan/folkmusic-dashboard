<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <standard-button :onClick="login">Log In</standard-button>
  </div>
</template>

<script>

  import firebase from 'firebase'
  import StandardButton from './StandardButton'

  export default {
    name: "login",
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
          this.$router.replace('dashboard')  
          },
          (err) => {
            alert("oops " + err.message)
          }
        )
      }
    },
    components: {
      StandardButton
    }
  }
</script>

<style scoped>

.login {
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 200px;
  padding: 15px;
  font-size: 16px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

</style>