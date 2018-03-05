// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import config from './firebase-config'
import UserStore from './stores/UserStore'

Vue.config.productionTip = false

let app
// Initialize Firebase
firebase.initializeApp(config)
  
firebase.auth().onAuthStateChanged(function (user) {
	console.log("firebase auth state changed!");
	
  if (!app) {
    app = new Vue({
			el: "#app",
			router,
			template: "<App/>",
			components: {App}
		})
	}
	if (user) {
		firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/name').once(
			'value', function (nameSnap) {
				// if they set a name when signing up, we can greet them with it,
				// otherwise, we use their email address.
				UserStore.set('username', (nameSnap.val() || user.email))
			})
		}
		if (!user) {
			UserStore.set('username', 'old person is gone now')
		}
})

/* eslint-disable no-new */
