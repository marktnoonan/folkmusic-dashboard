<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login">Log In</button>
  </div>
</template>

<script>

  import firebase from 'firebase'

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
    }
  }
</script>

<style scoped>

.login {
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
  font-size: 16px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

</style>