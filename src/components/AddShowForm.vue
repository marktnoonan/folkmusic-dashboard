<template>

<div class="wrapper">
	<form autocomplete="off" @submit.prevent="onSubmit">
		<div class="date-picker-container">
			<!-- this should really be a label, but that was causing unwanted behavior
			in the date-picker component. Not sure what the interaction is. -->
	    <span>{{showCells[0].label}}</span>
			<date-picker 
				v-model="showCells[0].content" 
				lang="en" 
				input-class="date-input"
				width="400"
				@input="confirmDateExists"
				></date-picker>
		</div>
		
		<venue-picker 
			@entered="updateVenueSearch($event)" 
			@changed="confirmTextExists($event)" 
			@populate="populateVenueDetails($event)"
			:venueSearch="venueSearch"
			:formReset="formReset"
			/>

		<fm-input :cell="2" @entered="updateForm('2','content', $event)" /><!-- description -->
		<fm-input :cell="3" @entered="updateForm('3','content', $event)" /><!-- phone -->
		<fm-input :cell="4" @entered="updateForm('4','content', $event)" /><!-- website -->

		<location-form-fields 
			@entered="updateForm(...$event)" 
			@changed="confirmTextExists($event)"
			@geocode="geocode" /> <!-- location information -->
  	
		<span class="address-details">{{addressDetails}}</span>

	<div>
		<standard-button type="button" :onClick="resetVenueList" class="reset">Clear Form</standard-button> 
  	<standard-button type="submit" class="submit">Add Show</standard-button> 
	</div>

</form>
	<div class="shows-added-container"><br>
		<h3>Shows Added</h3>
		<ul class="shows-added-list">
			<li v-for="(show, index) in showsAddedThisSession" :key="show[0]+index">{{show[0]}} - {{show[1]}}, {{show[5]}}</li>
		</ul>
		
	</div>
	<modal
		v-show="isModalVisible"
		@close="closeModal"
	>
		<div slot="body">{{modalMessage}}</div>
	</modal>
</div>

</template>

<script>
import firebase from 'firebase'
import oldShows from '../assets/shows.json'
import VenuePicker from './VenuePicker'
import LocationFormFields from './LocationFormFields'
import FmInput from './FmInput'
import StandardButton from './StandardButton'
import SmallButton from './SmallButton'
import DatePicker from 'vue2-datepicker'
import VenueStore from '../stores/VenueStore.js'
import ShowCellsStore from '../stores/ShowCellsStore.js'
import Modal from './Modal'

export default {
	data() {
		return {
			date: null,
			showCells: ShowCellsStore.state.showCells,
			addressDetails: '',
			messageAfterSubmit: '',
			showsAddedThisSession: [],
			isModalVisible: false,
			modalMessage: '',
			venueSearch: '',
			formReset: false
		}
	},
	props: {},
	events: {
	},
	methods: {
		populateVenueDetails(show) {
			console.log("Populate venue details, i've been called")
			this.venueSearch = show.Venue			// adjusting for labels clearer in the UI than they are in the Google Sheet
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
		},
		onSubmit() {
			document.querySelector('.submit').blur()			
			if (this.showCells[1].content === '' && this.venueSearch === ''){
				this.addFormError('.venue-name > input')				
				this.showModal('Show must have a venue')
				return
			} else if (this.showCells[1].content === '' && this.venueSearch !== ''){
				// covers the case where we are using a venue that's not in the database
				this.showCells[1].content = this.venueSearch
				this.clearFormError('.venue-name > input')
				// TODO: add checkbox to save new venues at this point.
			}
			let showCells = this.showCells
			if (showCells[7].content !== '' && showCells[8].content !== '' && showCells[0].content !== '') {
				this.safeToAddShow = true
			}	else if (showCells[0].content === '') {
				this.showModal("Show must have a date")
				this.addFormError('.mx-datepicker')
				return
			} else if (showCells[7].content === '' || showCells[8].content === '') {
				if (showCells[6].content !== ''){
				this.geocode("at submit time")
				} else {
				// this selector is currently pretty brittle
				this.addFormError('textarea')
					this.showModal("Show must have an address")	
					return
				}
			
			} 

			if (this.safeToAddShow) {
				this.saveShow()
			} 
			
		},
		clearFormError(selector) {
				if (this.fieldError(selector)){
					document.querySelector(selector).classList.remove('form-error')	
				}
			},
		addFormError(selector){
				if (!this.fieldError(selector))
				document.querySelector(selector).classList.add('form-error')
			},
		fieldError(selector){
				return Array.from(document.querySelector(selector).classList).includes('form-error')
			},
		saveShow() {
				let showCells = this.showCells

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
						setTimeout(() => instance.messageAfterSubmit = '', 2000)
						instance.resetVenueList()
						instance.showsAddedThisSession.push(rowContent)
					}
				})
				archiveRef.push(rowContent)
		},
		resetVenueList() {
			// formReset is just a trigger that can be watched by child components, so they know that a reset is happening
			this.formReset = !this.formReset
			this.venueSearch = ''
			this.willBeSelected = 0
			this.addressDetails = ''
			this.showCells.forEach(cell => (cell.content = ''))
		},
		geocode: function(when) {
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
							
							console.log(location.components)
							if (location.components.city){
								this.showCells[5].content = `${location.components.city}, ${location.components.state_code}`								
							} else if (location.components.town) {
								this.showCells[5].content = `${location.components.town}, ${location.components.state_code}`																	
							} else {
								this.showCells[5].content = `${location.components.county}, ${location.components.state_code}`																									
							}
						
							if (when === "at submit time") {
								this.saveShow()
							}
							
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
					}
				)
		},
		confirmTextExists(event) {
			if (event.path[0].value.length > 0) {
				event.path[0].classList.remove('form-error')
			}
		},
		confirmDateExists() {
			if (this.showCells[0].content !== '') {
			  this.clearFormError('.mx-datepicker')
			}
		},
		showModal(msg) {
			this.modalMessage = msg
      this.isModalVisible = true
		},
	  closeModal() {
			this.isModalVisible = false
			this.modalMessage = ''
		},
		updateForm(index, prop, content) {
			ShowCellsStore.set(index, prop, content)
		},
		updateVenueSearch(search){
			console.log("update venue search called")
			this.venueSearch = search
			this.showCells[1].content = search
		}
	},
	components: {
		FmInput,
		LocationFormFields,
		StandardButton,
		SmallButton,
		VenuePicker,
		DatePicker,
		Modal
	}
}
</script>

<style scoped>

.shows-added-container {
	display: inline-block;
}

span {
	display: inline-block;
	vertical-align: top;
	margin-top: 4px;
}
form {    
	margin: 0 auto;
	text-align: right;
	display: inline-block;
	vertical-align: text-top;
}

fieldset {
	border: 0;
	padding: 0;
}

.geocode {
	margin-top: 10px;
}

label {
	display: block;
	text-align: right;
}

.address-details {
	color: darkcyan;
	display: block;
	margin-bottom: 10px;
}

.submit {
	background-color: rgb(161, 191, 121);
}

.reset {
	background-color: rgb(225, 134, 134);
}

h3 {
	margin: 2px;
	background-color: rgba(255, 255, 255, 0.5);
	padding: 2px;
}
.fade-enter-active {
  transition: opacity .3s;
}
.fade-leave-active {
  transition: all 0
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.form-error {
	box-shadow: 0px 0px 2px 2px orangered;
}

.shows-added-list {
	margin-top: 0;
	list-style-type: initial;
	text-align: left;
	display: block;
	background-color: initial;
	color: initial;
	box-sizing: border-box;
	width: initial;
	position: absolute;
	border-radius: 0;
}

</style>