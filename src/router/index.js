import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import AddShowForm from '@/components/AddShowForm'
import NewsTicker from '@/components/NewsTicker'
import DisplayNewsTicker from '@/components/DisplayNewsTicker'
import Venues from '@/components/Venues'
import Welcome from '@/components/Welcome'
import PublicGigViewer from '@/components/PublicGigViewer'

import firebase from 'firebase'

Vue.use(VueResource)
Vue.use(Router)

let router = new Router({
	routes: [
		{
			path: '/dashboard',
			redirect: '/dashboard/welcome',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				requiresAuth: true
			},
			children: [
				{
					path: 'add-show',
					name: 'Add a Show',
					component: AddShowForm
				},
				{
					path: 'news-ticker',
					name: 'Edit News Ticker',
					component: NewsTicker
				},
				{
					path: 'display-news-ticker',
					name: 'Display News Ticker',
					component: DisplayNewsTicker
				},
				{
					path: 'venues',
					name: 'Venues',
					component: Venues
				},
				{
					path: 'welcome',
					name: 'Welcome',
					component: Welcome
				}
			]
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/sign-up',
			name: 'SignUp',
			component: SignUp
		},
		{
			path: '/public/:publicID',
			name: 'PublicGigViewer',
			component: PublicGigViewer
		},
		{
			path: '/',
			redirect: '/login'
		},
		{path: '*', redirect: '/login'}
	]
})

router.beforeEach((to, from, next) => {
	let currentUser = firebase.auth().currentUser
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

	if (requiresAuth && !currentUser) {
		next('login')
	} else if (to.path.includes('/public')) {
		next()
	} else if (!requiresAuth && currentUser) {
		// not sure I really need this guard.. but it stops people ending up at routes that don't exist.
		// maybe we should direct them to a 404 state within this?
		next('/dashboard')
	} else {
		next()
	}
})

export default router
