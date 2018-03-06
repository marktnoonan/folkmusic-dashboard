<template>
  <div id="root">
    <h2> News </h2>
    <display-news-ticker />
    <h2>Shows</h2>
    <div v-if="shows.length">
      <gig-listing v-for="(show, i) in shows" :key="show[0] + i" :show="show"/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import GigListing from './GigListing'
import DisplayNewsTicker from './DisplayNewsTicker'

  export default {
    data() {
      return {
        publicID: this.$route.params.publicID,
        shows: []
      }
    },
    components: {
      GigListing,
      DisplayNewsTicker
      },
    methods: {
      fetchPublicShows (id) {
        const vm = this
        firebase.database().ref('public/' + id).once('value', function (snap) {
          vm.shows = []
          const showsObj = snap.val()
          for (let show in showsObj) {
            vm.shows.push(showsObj[show])
          }        
        })
      }
    },
    mounted() {
      this.fetchPublicShows(this.publicID)
    },
    watch: {
    $route: function (to, from) {
      this.publicID = to.params.publicID
      this.fetchPublicShows(to.params.publicID)
      }
    } 
  }
</script>

<style scoped>
  #root {
    max-width: 600px;
    margin: auto;
  }
</style>