<template>
  <div class="venue-container" v-if="dataLoaded">
    <label>
      Search for a venue by name:<br /> 
          <input type="text" v-model="venueSearch" /> 
          <br>
          <standard-button :onClick="clearSearch">List All Venues</standard-button>
    </label>

    <div 
      v-for="(venue, index) in filteredVenues" 
      :key="venue.venueID" 
      :class="{
        'venue-listing': true,
        'currently-editing': currentlyEditing === venue.venueID
      }" 
      :id="index">
      <h3>{{venue.Venue}}, {{venue.City}}
      <small-button 
        class="edit"
        :disabled="currentlyEditing === venue.venueID"
        :onClick="edit.bind(this, venue.venueID, index)">Edit</small-button>
      <small-button 
        class="cancel"
        :onClick="remove.bind(this, venue)">Delete</small-button>
      </h3>
      <transition name="fade">
      <form 
        v-if="currentlyEditing === venue.venueID"
        @submit.prevent>
        <label>
          Venue Name
          <input type="text" v-model.lazy="venue.Venue" />
        </label>
        <label>
          Concert Description
          <input type="text" v-model="venue.Description" />
        </label>
        <label>
          Address
          <textarea v-model="venue.Address" rows="5" cols="50" />      
        </label>
        <label>
          Display City
          <input type="text" v-model="venue.City" />      
        </label>
        <label>
          Ticket Phone
          <input type="text" v-model="venue['Phone Number']" />
        </label>
        <label>
          Previous Ticket Link
          <input type="text" v-model="venue.Website" />      
        </label>
        <standard-button 
          :onClick="cancelEditing.bind(this, venue.venueID)" 
          @click.prevent
          class='cancel'
          >
          Cancel
        </standard-button>
        <standard-button 
          :onClick="confirmEditing.bind(this, venue, index)" 
          @click.prevent
          class='submit'
          >
          Save
        </standard-button>
      </form>
      </transition>
    </div>
    
  </div>
</template>

<script>

import StandardButton from './StandardButton'
import SmallButton from './SmallButton'
import VenueStore from '../stores/VenueStore.js'
import matchSorter, {rankings, caseRankings} from 'match-sorter'

window.VenueStore = VenueStore
import firebase from 'firebase'
export default {
  components: {
    StandardButton,
    SmallButton
  },
	data() {
		return {
      venueSearch: '',
      currentlyEditing: "",
      userVenues: [],
      dataLoaded: false,
      storeData: VenueStore.data
		}
  },
  mounted() {
    VenueStore.methods.getUserVenues(this, "userVenues")    
  },
  methods: {
    editing(venueID) {
      return this.currentlyEditing === venueID
    },
    edit(venueID, id){
      this.currentlyEditing = venueID

      // these just move us to the right place to see which thing we are editing
      window.location.hash = id
      window.scrollBy(0, -30)
    },
    cancelEditing() {
      this.currentlyEditing = ''
    },
    confirmEditing(venue) {
      const targetRef = this.getFirebaseRef(venue)
      targetRef.set(venue)      
    },
    clearSearch(){
      this.venueSearch = ''
    },
    remove(venue){
      const targetRef = this.getFirebaseRef(venue)
      targetRef.remove(()=>{
        VenueStore.methods.getUserVenues()
      })
    },
    getFirebaseRef(venue){
      const venueIndex = venue.fBIndex
      return firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/venues/' + venueIndex)
  }
  },
  computed: {
    		filteredVenues() {
			if (this.venueSearch.length){				
			return matchSorter(
				this.userVenues, 
				this.venueSearch, 
				{
					keys: [(venue) => venue.Venue],
					threshold: matchSorter.rankings.WORD_STARTS_WITH
					}
				)
			} else {
        return this.userVenues
      }
		}
  }
}
</script>

<style scoped>

.venue-listing {
  display: block;
  margin: 8px;
  padding: 4px 6px;
  /* background-color: rgb(217, 217, 217);
  border-radius: 4px; */
}

label, input, textarea {
  display: block;
  padding: 10px;
	font-size: 0.9em;
  width: 100%; 
}

h3 {
  margin: 0;
  position: relative;
}
button {
  margin: 0;
}
.cancel {
	background-color: rgb(225, 134, 134);
}

.currently-editing {
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: rgb(217, 217, 217);

}

.fade-enter-active {
  transition: opacity .6s;
}

.fade-leave-active {
  transition: all 0
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>