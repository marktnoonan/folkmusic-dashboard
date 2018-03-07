<template>
  <div class="login">
    <h3>Sign Up</h3>
    <input type="text" v-model="name" placeholder="Name (optional)"><br>
    <input type="email" v-model="email" placeholder="Email (required)" required><br>
    <input type="password" v-model="password" placeholder="Password (required)" required><br>
		(Password should be 6 characters or more.) <br>
    <standard-button :onClick="signUp">Sign Up</standard-button>
  </div>
</template>

<script>
import firebase from 'firebase'
import StandardButton from './StandardButton'

export default {
	name: 'signUp',
	data: function() {
		return {
			name: '',
			email: '',
			password: ''
		}
	},
	methods: {
		signUp() {
			const vm = this
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then(
					function(user) {
						vm.$router.replace('dashboard')
						if (vm.name) {
							firebase
								.database()
								.ref('users/' + firebase.auth().currentUser.uid + '/name')
								.set(vm.name)
						}
					},
					function(err) {
						alert(
							`A screwup of some kind took place!

            Please make sure that your email address is correctly formatted,
            and the password is 6 or more characters long. `
						)
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
	margin-top: 100px;
	width: 320px;
	margin: 100px auto 0 auto;
	text-align: center;
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
