<template>
  <div class="dash">
		<nav>
			<ul class="menu">
				<li><router-link to="/dashboard/add-show">Add A Show</router-link></li>
				<li><router-link to="/dashboard/venues">Stored Venues</router-link></li>
				<li><router-link to="/dashboard/news-ticker">Edit News Ticker</router-link></li>
				<li><router-link to="/dashboard/display-news-ticker">Preview News Ticker</router-link></li>
				<li v-if="!publicID"><small-button :onClick="makePublicLink">Create Public URL</small-button></li>			
				<li><small-button :onClick="logout">Log Out</small-button></li>
				<li><span class="logged-in-as">Logged in as {{user.username}}</span></li>				
  	  </ul>
		</nav>      
		<span v-if="this.publicURL" class="public-url">Public URL: 
			<a :href="this.publicURL" target="_blank">{{this.publicURL}}</a>
		</span>
		<transition name="fade">
    	<router-view />
		</transition>
<br><br>

  </div>
</template>

<script>
import firebase from 'firebase'
import StandardButton from './StandardButton'
import SmallButton from './SmallButton'
import shortid from 'shortid'
import UserStore from '../stores/UserStore.js'

export default {
	name: 'Dashboard',
	data() {
		return {
			safeToAddShow: false,
			successMessage: '',
			newsTickerItems: [],
			publicID: '',
			user: UserStore.state
		}
	},
	methods: {
		logout: function() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.replace('login')
				})
		},
		makePublicLink: function() {
			const linkID = shortid.generate()
			let showsToAdd = []
			firebase
				.database()
				.ref('users/' + firebase.auth().currentUser.uid + '/showsToAdd')
				.once('value', function(snap) {
					showsToAdd = snap.val() || []
					for (let show in showsToAdd) {
						firebase
							.database()
							.ref('public/' + linkID)
							.push(showsToAdd[show])
					}
				})
			firebase
				.database()
				.ref('users/' + firebase.auth().currentUser.uid + '/public-id')
				.set(linkID)
			this.publicID = linkID
		}
	},
	computed: {
		publicURL() {
			if (this.publicID) {
				return (
					'https://markthomasnoonan.com/folkmusic-dashboard/#/public/' +
					this.publicID
				)
			}
		}
	},
	mounted() {
		const vm = this
		firebase
			.database()
			.ref('users/' + firebase.auth().currentUser.uid + '/public-id')
			.once('value', function(snap) {
				vm.publicID = snap.val() || null
			})
	},
	components: {
		StandardButton,
		SmallButton
	}
}
</script>

<style scoped>
nav {
	background-color: rgb(180, 186, 186);
}

h1,
h2 {
	font-weight: normal;
}
ul {
	margin: 0 0 20px 0;
	list-style-type: none;
	padding: 0 0 10px 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #2c3e50;
	text-decoration: none;
	font-weight: bold;
}

.public-url {
	display: block;
	margin: 0 auto 10px auto;
	width: 80vw;
	text-align: center;
	word-wrap: break-word;
	border: 1px solid green;
	padding: 4px;
	border-radius: 3px;
}

.logged-in-as {
	font-size: 12px;
}

.fade-enter-active {
	transition: opacity 0.3s;
}
.fade-leave-active {
	transition: all 0;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
