<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password" @keyup.enter="login"><br>
    <standard-button :onClick="login">Log In</standard-button> or 
    <router-link to="/sign-up">Sign Up</router-link>
    
    <div v-if="messageToUser" class="message-to-user">{{messageToUser}}</div>
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
        password: '',
        messageToUser: ''
      }
    },
    methods: {
      login: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
          this.$router.replace('dashboard')  
          },
          (err) => {
            console.log(err);
            
            this.messageToUser = "Login failed: " + err.message
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
  min-width: 80px;
}

.message-to-user {
  margin: 10px;
  border: 2px solid orangered;
  padding: 6px;
  width: auto;
}

</style>