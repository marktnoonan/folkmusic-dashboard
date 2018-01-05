<template>
  <div>
<h4>News Ticker Items</h4>
<div v-for="(item, index) in tickerItems" :key="item.key">
  <textarea v-model="item.text" cols="50" rows="2"> </textarea>
  <span class="item-deleter" @click="removeItem(index)">x</span>
</div>
<standard-button :onClick="createTickerItem">Add a new item</standard-button>
<standard-button :onClick="updateFirebase">Save Changes</standard-button>
<standard-button :onClick="undoChanges">Undo All Changes</standard-button>

<!-- 
  TODO:
  Need a way to track what has been edited and give it a different style/color/something so that when I click "save changes", those things can lock in.
 -->

  </div>
</template>

<script>
import StandardButton from "./StandardButton"
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
			console.log("remove item " + index)
			this.tickerItems.splice(index, 1)
		},
		undoChanges() {
			let instance = this
			this.tickerRef.once("value").then(function(snap) {
				instance.tickerItems = snap.val()
			})
		}
	},
	components: {
		StandardButton
	},
	mounted() {
		const tickerRef = firebase.database().ref("news-ticker-items")
		this.tickerRef = tickerRef
		let instance = this
		tickerRef.once("value").then(function(snap) {
			instance.tickerItems = snap.val()
		})
	}
}
</script>

<style scoped>
textarea {
	padding: 10px;
	font-size: 0.9em;
	width: 400px;
	margin: 10px;
	resize: none;
}
.item-deleter {
	position: absolute;
	color: red;
	cursor: pointer;
	transform: translate(-5px, 6px);
}
</style>