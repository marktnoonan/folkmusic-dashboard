<template>
  <div class="dash">
      <ul class="menu">
      <li><router-link to="/dashboard/add-show">Add A Show</router-link></li>
      <li><router-link to="/dashboard/venues">Stored Venues</router-link></li>
      <li><router-link to="/dashboard/news-ticker">Edit News Ticker</router-link></li>
      <li><router-link to="/dashboard/display-news-ticker">Preview News Ticker</router-link></li>
      <li v-if="!publicID"><small-button :onClick="makePublicLink">Create Public URL</small-button></li>			
      <li><small-button :onClick="logout">Log Out</small-button></li>
    </ul>
		<span v-if="this.publicURL" class="public-url">View your calendar and news ticker on the web at
			<a :href="this.publicURL" target="_blank">{{this.publicURL}}</a>
		</span>
		<transition name="fade">
    	<router-view />
		</transition>
<br><br>

  </div>
</template>

<script>
import firebase from "firebase"
import StandardButton from "./StandardButton"
import SmallButton from "./SmallButton"
import shortid from 'shortid'

export default {
	name: "Dashboard",
	data() {
		return {
			safeToAddShow: false,
      successMessage: '',
			newsTickerItems: [],
			publicID: ''
		};
	},
	methods: {
		logout: function() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.replace("login");
				});
		},
		makePublicLink: function () {
			const linkID = shortid.generate()
			let showsToAdd = []
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/showsToAdd')
			.once('value', function (snap) {
				showsToAdd = snap.val() || []
				console.log(showsToAdd)
				for (let show in showsToAdd){
					firebase.database().ref('public/' + linkID).push(showsToAdd[show])				
				}
			})
			console.log("making public link here: " + linkID)
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/public-id').set(linkID)

		}
	},
	computed: {
		publicURL () {
			if (this.publicID) {
				return "https://markthomasnoonan.com/folkmusic-dashboard/#/public/" + this.publicID
			}
		}
	},
	mounted() {
			const vm = this
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/public-id').once('value', 
			function(snap){
				vm.publicID = snap.val() || null
			})
	},
	components: {
		StandardButton,
		SmallButton
  }
  
};
</script>

<style scoped>
h1,
h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
  padding-top: 10px;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: rgb(21, 95, 105);
  text-decoration: none;
  font-weight: bold;
}
.fade-enter-active {
  transition: opacity .3s;
}
.fade-leave-active {
  transition: all 0
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
