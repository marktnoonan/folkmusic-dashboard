<template>
  <div class="dash">
      <ul class="menu">
      <li><router-link to="/dashboard/add-show">Add A Show</router-link></li>
      <li><router-link to="/dashboard/venues">Stored Venues</router-link></li>
      <li><router-link to="/dashboard/news-ticker">Edit News Ticker</router-link></li>
      <li><router-link to="/dashboard/display-news-ticker">Preview News Ticker</router-link></li>
      <li><small-button :onClick="logout">Log Out</small-button></li>
    </ul>
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
export default {
	name: "Dashboard",
	data() {
		return {
			safeToAddShow: false,
      successMessage: '',
			newsTickerItems: []
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
		}
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
