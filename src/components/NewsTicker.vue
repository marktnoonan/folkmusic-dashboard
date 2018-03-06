<template>
<div class="wrapper">
	<display-news-ticker />
<h4>News Ticker Items</h4>
<div v-for="(item, index) in tickerItems" :key="item.key">
  <textarea v-model="item.text" cols="50" rows="2"> </textarea>
  <span class="item-deleter" @click="removeItem(index)">x</span>
</div>
<standard-button :onClick="createTickerItem">Add a new item</standard-button>
<standard-button :onClick="undoChanges" class="reset">Undo Unsaved Changes</standard-button>
<standard-button :onClick="updateFirebase" class="submit">Save Changes</standard-button>
<!-- 
  TODO:
  Need a way to track what has been edited and give it a different style/color/something so that when I click "save changes", those things can lock in.
  -->

</div>


</template>

<script>
import StandardButton from "./StandardButton"
import DisplayNewsTicker from "./DisplayNewsTicker"

import firebase from "firebase"

export default {
	data() {
		return {
			tickerItems: [],
			tickerRef: null
		}
	},
	methods: {
		updateFirebase() {
			this.tickerRef.set(this.tickerItems)
		},
		createTickerItem() {
			this.tickerItems.push({key: Date.now(), text: ""})
		},
		removeItem(index) {
			this.tickerItems.splice(index, 1)
		},
		undoChanges() {
			let vm = this
			this.tickerRef.once("value").then(function(snap) {
				vm.tickerItems = snap.val()
			})
		}
	},
	components: {
		StandardButton,
		DisplayNewsTicker
	},
	mounted() {

		this.tickerRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/news-ticker-items')
		
		let vm = this
		this.tickerRef.once("value").then(function(snap) {
			if (snap.val() !== null){
						vm.tickerItems = snap.val()
			}	else {
			firebase.database().ref('news-ticker-defaults').once('value').then(
				function(defaultSnap){
					vm.tickerRef.set(defaultSnap.val())
				}
			)
			}

		})
	}
}
</script>

<style scoped>
.wrapper {
	width: 500px;
	margin: auto;
}
textarea {
	padding: 10px;
	font-size: 0.9em;
	width: 90%;
	margin: 10px;
	resize: none;
}
.item-deleter {
	position: absolute;
	color: red;
	cursor: pointer;
	transform: translate(-5px, 6px);
}

.submit {
  background-color: rgb(161, 191, 121);
}

.reset {
	background-color: rgb(225, 134, 134);
}

@media (max-width:530px) {
	.wrapper {
		width: 100%;
	}
}

</style>