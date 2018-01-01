import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import firebase from 'firebase'

Vue.use(VueResource)
Vue.use(Router)

let router = new Router({
	routes: [
		{
			path: "/dashboard",
			name: "Dashboard",
			component: Dashboard,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/login",
			name: "Login",
			component: Login
		},
		{
			path: "/",
			redirect: "/login"
		},
		{
			path: "*",
			redirect: "/login"
		}
	]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('dashboard')
  else next()
})

export default router