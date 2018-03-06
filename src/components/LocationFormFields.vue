<template>
  <div class="address-component">
    <fm-input class="address"
      :cell="6" 
      @entered="updateForm('6','content', $event)"
      @changed="confirmTextExists"
      @geocode="geocode" 
      /> 
		<fm-input :cell="5" @entered="updateForm('5','content', $event)" /><!-- display city -->  
  <fieldset class="latlong">
    <fm-input class="lat" :cell="7" @entered="updateForm('7','content', $event)" />
    <fm-input class="lat" :cell="8" @entered="updateForm('8','content', $event)" />
  </fieldset>

  </div>
</template>

<script>
import FmInput from './FmInput'
import ShowCellsStore from '../stores/ShowCellsStore.js'

export default {
  data() {
    return {
      showCells: ShowCellsStore.state.showCells,
			addressDetails: ''      
    }
  },
  components:{
      FmInput
    },
  methods: {
    updateForm(index, prop, content){
      this.$emit('entered', [index, prop, content] )
    },
    confirmTextExists(event){
      this.$emit('changed', event)
    },
    geocode(){
      this.$emit('geocode')
    }
  }
  }
</script>

<style scoped>

fieldset {
	border: 0;
	padding: 0;
}

input,
textarea {
	padding: 3px;
	font-size: 0.9em;
	width: 100%;
}

textarea {
	resize: none
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

@media (max-width:530px) {
	span {
		display: block !important; 
	}
  input,
  textarea {
    width: 100%
  }
  label {
    text-align: left;
  }
}

</style>