<template>
  <div>
<h4>News Ticker Items</h4>
  <input type="text" v-for="item in tickerItems" :key="item.key" v-model="item.text">
<standard-button :onClick="updateFirebase">Save Changes</standard-button>
  </div>
</template>

<script>
import StandardButton from './StandardButton'
import firebase from "firebase";

export default {
	data() {
		return {
      tickerItems: [],
      tickerRef: null
		};
  },
  methods: {
    updateFirebase(){
      this.tickerRef.set(this.tickerItems)
    }
  },
  components:{
    StandardButton
  },
	mounted() {
    const tickerRef = firebase.database().ref("news-ticker-items");
    this.tickerRef = tickerRef;
		let instance = this;
		tickerRef.once("value").then(function(snap) {
			instance.tickerItems = snap.val();
		});
	}
};
</script>

<style scoped>
input {
	padding: 10px;
	font-size: 0.9em;
	width: 90%;
	margin: 10px;
}
</style>