<template>
  <div class="login">
    <h2>Log In</h2>

    <input autocomplete="off" type="text" v-model="email" placeholder="Email"><br>
    <input autocomplete="off" type="password" v-model="password" placeholder="Password" @keyup.enter="login"><br>
    <standard-button :onClick="login">Log In</standard-button> or 
    <router-link to="/sign-up">Sign Up</router-link>
    <div v-if="messageToUser" class="message-to-user">{{messageToUser}}</div>
  </div>
</template>

<script>
import firebase from 'firebase'
import StandardButton from './StandardButton'

export default {
	name: 'login',
	data: function() {
		return {
			email: '',
			password: '',
			messageToUser: '',
			isMcC: false // flag to avoid real user seeing unfishished features.
		}
	},
	methods: {
		login: function() {
			let vm = this
			if (this.email && this.password) {
				firebase
					.auth()
					.signInWithEmailAndPassword(this.email, this.password)
					.then(
						user => {
							firebase
								.database()
								.ref('users/' + firebase.auth().currentUser.uid + '/isMcC')
								.once('value', function(snap) {
									vm.isMcC = snap.val() || false
									if (!vm.isMcC) {
										vm.$router.replace('dashboard/welcome')
									} else {
										vm.$router.replace('dashboard/add-show')
									}
								})
						},
						err => {
							console.log(err)

							this.messageToUser = 'Login failed: ' + err.message
						}
					)
			} else {
				console.log('nothing entered')
			}
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
