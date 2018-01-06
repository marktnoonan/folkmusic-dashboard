<template>
  <div class="venue-container">
    <div v-for="(venue, index) in venues" :key="venue.Venue" class="venue-listing" :id="index">
      <h3>{{venue.Venue}}, {{venue.City}}
      <standard-button 
        class="edit"
        v-if="currentlyEditing !== venue.Venue"
        :onClick="edit.bind(this, venue.Venue, index)">Edit</standard-button>
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

export default {
  components: {
    StandardButton
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
      window.location.hash = id
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
.edit {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

</style>