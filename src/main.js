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
  if (!app) {
    app = new Vue({
			el: "#app",
			router,
			template: "<App/>",
			components: {App}
		})
		UserStore.data.username = user.email
  }
})

/* eslint-disable no-new */
