<template>
  <div class="venue-container">
    <div 
      v-for="(venue, index) in venues" 
      :key="venue.Venue" 
      :class="{
        'venue-listing': true,
        'currently-editing': currentlyEditing === venue.Venue
      }" 
      :id="index">
      <h3>{{venue.Venue}}, {{venue.City}}
      <small-button 
        class="edit"
        :disabled="currentlyEditing === venue.Venue"
        :onClick="edit.bind(this, venue.Venue, index)">Edit</small-button>
      </h3>
      <form 
        v-if="currentlyEditing === venue.Venue"
        @submit.prevent>
        <label>
          Venue Name
          <input type="text" v-model="venue.Venue" disabled/>
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
          :onClick="cancelEditing.bind(this, venue.Venue)" 
          @click.prevent
          class='cancel'
          >
          Cancel
        </standard-button>
      </form>
    </div>
    
  </div>
</template>

<script>
import venues from '../assets/shows.json'
import StandardButton from './StandardButton'
import SmallButton from './SmallButton'

export default {
  components: {
    StandardButton,
    SmallButton
  },
	data() {
		return {
      venues: venues,
      currentlyEditing: ""
		}
  },
  methods: {
    editing(venueName) {
      return this.currentlyEditing === venueName
      // FIXME: problem when editing the venue name itself ... it immediately closes the editor because obviously, the name is different now.
      // Doh.
    },
    edit(venueName, id){
      this.currentlyEditing = venueName
      
      // these just move us to the right place to see which thing we are editing
      window.location.hash = id
      window.scrollBy(0, -30)
    },
    cancelEditing() {
      this.currentlyEditing = ''
    },
    confirmEditing(venueName) {
      console.log("confirmed edit for" + venueName)
    }
  }
}
</script>

<style scoped>

.venue-listing {
  display: block;
  margin: 8px;
  padding: 4px 6px;
  background-color: rgb(217, 217, 217);
  border-radius: 4px;
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
  border: 1px solid rgba(0, 0, 0, 0.4)
}

</style>