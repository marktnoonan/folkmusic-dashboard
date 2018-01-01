// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCX5U04FhH0GofSTSi8sx6y1UjAbn72gyI",
    authDomain: "folkmusic-dashboard.firebaseapp.com",
    databaseURL: "https://folkmusic-dashboard.firebaseio.com",
    projectId: "folkmusic-dashboard",
    storageBucket: "",
    messagingSenderId: "759403886875"
  };
firebase.initializeApp(config)
  
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
			el: "#app",
			router,
			template: "<App/>",
			components: {App}
		})
  }
})

/* eslint-disable no-new */
