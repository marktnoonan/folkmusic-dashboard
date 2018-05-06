<template>
<label class="venue-name">
    <span>Venue</span>
    <input
			v-model="content" 
			type="text" 
			@keyup.down="increaseSelection" 
			@keyup.up="decreaseSelection"
		  @keyup.enter.prevent="confirmSelection"
			@change="confirmTextExists"
      @input="input"
			id="venue-input"
		/>
    <ul id="venues" class="venue-ul">
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
</template>

<script>
import oldShows from '../assets/shows.json'
import VenueStore from '../stores/VenueStore.js'
import matchSorter, {rankings, caseRankings} from 'match-sorter'

export default {
	data() {
		return {
			userVenues: oldShows,
			willBeSelected: 0,
			showVenueList: true,
			content: this.venueSearch
		}
	},
	props: ['venueSearch', 'formReset'],
	watch: {
		venueSearch: function() {
			this.content = this.venueSearch
		},
		formReset: function() {
			this.willBeSelected = 0
			this.showVenueList = true
		}
	},
	methods: {
		increaseSelection() {
			if (this.content.length) {
				if (this.willBeSelected < this.possibleVenues.length - 1) {
					this.willBeSelected++
				}
			}
		},
		decreaseSelection() {
			if (this.content.length) {
				if (this.willBeSelected > 0) {
					this.willBeSelected--
				}
			}
		},
		confirmSelection(event) {
			console.log('confirmed', event)
			event.preventDefault()
			if (this.possibleVenues) {
				this.populateVenueDetails(this.possibleVenues[this.willBeSelected])
			}
		},
		confirmTextExists(event) {
			this.$emit('changed', event)
		},
		populateVenueDetails(show) {
			this.$emit('entered', this.content)
			this.$emit('populate', show)
			this.showVenueList = false
		},
		input() {
			this.$emit('entered', this.content)
		}
	},
	computed: {
		possibleVenues() {
			if (this.content.length) {
				return matchSorter(this.userVenues, this.content, {
					keys: [venue => venue.Venue],
					threshold: matchSorter.rankings.WORD_STARTS_WITH
				})
			}
		}
	},
	mounted() {
		VenueStore.methods.getUserVenues(this, 'userVenues')
	}
}
</script>

<style scoped>
span {
	display: inline-block;
	vertical-align: top;
	margin-top: 12px;
}
input {
	padding: 3px;
	font-size: 0.9em;
	width: 400px;
	margin-top: 10px;
}

.form-error {
	box-shadow: 0px 0px 2px 2px orangered;
}
.venue {
	cursor: pointer;
	font-weight: bold;
}

.selected-venue {
	background-color: yellowgreen;
}

.venue-ul {
	list-style-type: none;
	text-align: left;
	display: block;
	background-color: #444;
	color: #ccc;
	box-sizing: border-box;
	width: 400px;
	padding: 0px;
	position: absolute;
	transform: translate(112px, -22px);
	border-radius: 0;
}

li {
	padding: 4px;
}

.willBeSelected {
	color: #fff;
}

@media (max-width: 530px) {
	span {
		display: block !important;
	}
	input {
		width: 100%;
		margin-top: 3px;
	}
	label {
		text-align: left;
	}
	.venue-ul {
		transform: translateY(-16px);
		width: 90vw;
	}
}
</style>
