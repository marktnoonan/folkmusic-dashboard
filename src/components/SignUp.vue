<template>
  <div class="login">
    <h3>Sign Up</h3>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <standard-button :onClick="signUp">Sign Up</standard-button>
  </div>
</template>

<script>

  import firebase from 'firebase'
  import StandardButton from './StandardButton'

  export default {
    name: "signUp",
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp(){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          function(user) {
            this.$router.replace('dashboard')  
          }, function(err) {
            alert("a screwup of some kind took place")
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