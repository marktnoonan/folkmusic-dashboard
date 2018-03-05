<template>
  <div>
    <h2>Shows</h2>
    <div v-if="shows.length">
      <gig-listing v-for="show in shows" :key="show[0]" :show="show"/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import GigListing from './GigListing'

  export default {
    data() {
      return {
        publicID: this.$route.params.publicID,
        shows: []
      }
    },
    components: {
      GigListing
      },
    mounted() {
      const vm = this;
      firebase.database().ref('public/' + this.publicID).once('value', function (snap) {
        const showsObj = snap.val()
        for (let show in showsObj) {
          vm.shows.push(showsObj[show])
        }        
//        vm.shows = snap.val() || []
        console.log("I did at least connect to firebase")
      })
    },
    watch: {
    $route: function (to, from) {
      this.publicID = to.params.publicID
      const vm = this;
      firebase.database().ref('public/' + to.params.publicID).once('value', function (snap) {        
        vm.shows = snap.val() || []
        console.log("I did at least connect to firebase")
      })
      }
    } 
  }
</script>

<style scoped>

</style>