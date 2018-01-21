<template>
<!-- 
A couple of things about this form. Autcomplete is off because user will be entering information about upcoming gigs, not their own personal info.
We have a simplified form of autocomplete to fill data based on previous versions.

I had planned to just have a v-for loop over the input elements, but vue does not like to set the type of
inputs dynamically, so everything is just laid out literally below.
-->


<form autocomplete="off" @submit.prevent="onSubmit">
		<fieldset>
	    <span>{{showCells[0].label}}</span><br>
			<date-picker v-model="showCells[0].content" lang="en" input-class="date-input"></date-picker>
		</fieldset>
    <label class="venue-name">
    <span>{{showCells[1].label}}</span><br>
    <input 
			v-model="venueSearch" 
			type="text" 
			@keyup.down="increaseSelection" 
			@keyup.up="decreaseSelection"
		  @keyup.enter.prevent="confirmSelection"
		/>
    <ul id="venues">
        <li 
          v-for="(show, index) in possibleVenues"
          v-if="showVenueList" 
          :key="index" 
          @click="populateVenueDetails(show)"
          :class="{
					'venue': true,
					'willBeSelected': willBeSelected === index
					}"
				>					
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
			 		 {{show.Venue}}
        </li>
      </ul>
    </label>
    <label class="description">
    <span>{{showCells[2].label}}</span><br>
    <input v-model="showCells[2].content" type="text"/>
  </label>  
    <label class="phone">
    <span>{{showCells[3].label}}</span><br>
    <input v-model="showCells[3].content" type="tel"/>
  </label>  
    <label class="site">
    <span>{{showCells[4].label}}</span><br>
    <input v-model="showCells[4].content" type="url"/>
  </label>  
    <label class="display-city">
    <span>{{showCells[5].label}}</span><br>
    <input v-model="showCells[5].content" type="text"/>
  </label>  
    <label class="address">
    <span>{{showCells[6].label}}</span><br>
    <textarea v-model="showCells[6].content" rows="6"/>
    <span class="address-details">{{addressDetails}}</span>
  </label>  
  <fieldset class="latlong">
  	<label class="lat">
    <span>{{showCells[7].label}}</span><br>
    <input v-model="showCells[7].content" type="number" step="any"/>
  	</label>  
    <label class="long">
    <span>{{showCells[8].label}}</span><br>
    <input v-model="showCells[8].content" type="number" step="any"/>
  	</label>
		<small-button type="button" :onClick="geocode" class="geocode">Check Address</small-button>
  </fieldset>
	<div>
		<standard-button type="button" :onClick="resetVenueList" class="reset">Clear Form</standard-button> 
  	<standard-button type="submit" class="submit">Add Show</standard-button> 
	</div>
		
  {{messageAfterSubmit}}
</form>


</template>

<script>
import firebase from 'firebase'
import oldShows from '../assets/shows.json'
import StandardButton from './StandardButton'
import SmallButton from './SmallButton'
import DatePicker from 'vue2-datepicker'
import matchSorter, {rankings, caseRankings} from 'match-sorter'
import VenueStore from '../stores/VenueStore.js'

export default {
	data() {
		return {
			date: null,
			userVenues: oldShows,
			showCells: [
				{type: 'date', content: '', label: 'Date'},
				{type: 'text', content: '', label: 'Venue'},
				{type: 'text', content: '', label: 'Description'},
				{type: 'tel', content: '', label: 'Phone Number'},
				{type: 'url', content: '', label: 'Website'},
				{type: 'text', content: '', label: 'Display City'},
				{type: 'text', content: '', label: 'Full Address'},
				{type: 'number', content: '', label: 'Latitude'},
				{type: 'number', content: '', label: 'Longitude'}
			],
			venueSearch: '',
			willBeSelected: 0,
			addressDetails: '',
			showVenueList: true,
			messageAfterSubmit: ''
		}
	},
	props: {},
	methods: {
		populateVenueDetails(show) {
			this.venueSearch = show.Venue
			// adjusting for labels clearer in the UI than they are in the Google Sheet
			this.showCells.forEach(cell => {
				if (cell.label !== 'Date' && cell.label !== 'Website') {
					if (cell.label === 'Display City') {
						cell.content = show['City']
					} else if (cell.label === 'Full Address') {
						cell.content = show['Address']
					} else {
						cell.content = show[cell.label]
					}
				}
			})
			this.showVenueList = false
		},
		onSubmit() {
			if (this.showCells[1].content === ""){
				return;
			}
			let showCells = this.showCells
			if (showCells[7].content !== '' && showCells[8].content !== '' && showCells[0].content !== '') {
				this.safeToAddShow = true
			}
			if (this.safeToAddShow) {
				let rowContent = showCells.map(cell => {
					return cell.content
				})
				// format the date for saving as an YYYY-MM-DD string
				let date = new Date(rowContent[0])
				rowContent[0] =
					date.getFullYear() +
					'-' +
					(date.getMonth() + 1) +
					'-' +
					date.getDate()

				const showRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/showsToAdd')
				const archiveRef = firebase.database().ref('formSubmissions')

				let instance = this
				showRef.push(rowContent, function(error) {
					if (error) {
						alert('There was an error saving this show.')
						// if there is an error we need to keep this showCells object and retry.
						// unless firebase does that automatically.
					} else {
						instance.messageAfterSubmit = 'Show saved!'
						instance.resetVenueList()
					}
				})
				archiveRef.push(rowContent)
			} else {
				alert("Please make sure there is a date for this show")
			}
			
		},
		resetVenueList() {
			this.showVenueList = true
			this.venueSearch = ''
			this.willBeSelected = 0
			this.showCells.forEach(cell => (cell.content = ''))
		},
		geocode: function() {
			this.$http
				.get(
					'https://api.opencagedata.com/geocode/v1/json?q=' +
						encodeURIComponent(this.showCells[6].content) +
						'&pretty=1&no_annotations=1&key=2b9e7715faf44bf2bb2f60bbae2768ba'
				)
				.then(
					response => {
						try {
							let location = response.body.results[0]
							this.addressDetails = `Address found in 
                                ${location.components.state}, 
                                ${location.components.country}`
							this.showCells[7].content = location.geometry.lat
							this.showCells[8].content = location.geometry.lng
						} catch (error) {
							if (this.showCells[6].content !== '') {
								this.addressDetails = `No location found for "${this
									.showCells[6].content}"`
							} else {
								// not sure this is necessarily true. Could that field be empty for some other reason ever?
								this.addressDetails = 'No address entered.'
							}
							// in case we had already set them:
							this.showCells[7].content = ''
							this.showCells[8].content = ''
						}
					},
					response => {
						console.log(response)
					}
				)
		},
		increaseSelection() {
			if (this.venueSearch.length){
				if (this.willBeSelected < this.possibleVenues.length - 1){
						this.willBeSelected++
				}
			}			
		},
		decreaseSelection() {
		if (this.venueSearch.length){
				if (this.willBeSelected > 0){
						this.willBeSelected--
				}
			}
		},
		confirmSelection(event) {
			this.populateVenueDetails(this.possibleVenues[this.willBeSelected])
		}
	},
	computed: {
		possibleVenues() {
			if (this.venueSearch.length){
				return matchSorter(
					this.userVenues, 
					this.venueSearch, 
					{
						keys: [(venue) => venue.Venue],
						threshold: matchSorter.rankings.WORD_STARTS_WITH
						}
					)
			}
		}
	},
	components: {
		StandardButton,
		SmallButton,
		DatePicker
	},
	mounted() {
		VenueStore.methods.getUserVenues(this, "userVenues")
	}
}
</script>

<style scoped>
form {
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr 1fr;
}

fieldset {
	border: 0;
	padding: 0;
}

.geocode {
	margin-top: 10px;
}

input,
textarea,
.date-input {
	padding: 10px;
	font-size: 0.9em;
	width: 90%;
}

textarea {
	resize: none
}

label {
	display: block;
	text-align: left;
}

.address-details {
	color: darkcyan;
	display: block;
	margin-bottom: 10px;
}

.venue {
	cursor: pointer;
	font-weight: bold;
}

.selected-venue {
	background-color: yellowgreen;
}

.submit {
	background-color: rgb(161, 191, 121);
}

.reset {
	background-color: rgb(225, 134, 134);
}

ul {
	list-style-type: none;
	text-align: left;
	display: block;
	background-color: #444;
	color: #ccc;
	box-sizing: border-box;
	width: 207px;
	padding: 0px;
	position: absolute;
	transform: translate(0, -22px);
	border-radius: 0;
}

li {
	padding: 4px;
}

.willBeSelected {
	color: #fff;
}

h3 {
	margin: 2px;
	background-color: rgba(255, 255, 255, 0.5);
	padding: 2px;
}
</style>