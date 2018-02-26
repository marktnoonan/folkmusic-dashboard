<template>
  <label>
    <!-- wrapping the whole thing in the label is good for accessibility -->
    <span>{{cellData.label}}</span>
    <!-- we cannot dynamically assign types to form inputs in vue, so: -->
    <input 
      v-if="isText" 
      type="text" 
      input="input" 
      v-model="cellData.content" 
      autocomplete="off"
      /> 
    <input 
      v-if="isUrl" 
      type="url" 
      @input="input" 
      @change="checkUrlProtocol"
      v-model="cellData.content" 
      autocomplete="off"
      /> 
    <input 
      v-if="isTel" 
      type="tel"
      @input="input" 
      v-model="cellData.content" 
      autocomplete="off"
      /> 
    <input 
      v-if="isNumber" 
      type="number" 
      @input="input" 
      v-model="cellData.content" 
      step="any"
      autocomplete="off"
      />
    <textarea 
      v-if="isTextarea" 
      v-model="cellData.content" 
      autocomplete="nope"
      @input="input" 
      @change="change"
      @blur="geocode"
      rows="3"
      />
  </label>
</template>

<script>
import ShowCellsStore from '../stores/ShowCellsStore.js'

export default {
	data() {
		return {
			cellData: ShowCellsStore.state.showCells[this.cell]
		}
	},
	methods: {
		input() {
			this.$emit('entered', this.cellData.content)
    },
    change(event) {
      this.$emit('changed', event)
    },
    geocode(){
      this.$emit('geocode')
    },
    checkUrlProtocol () {
      const url = this.cellData.content
      const protocolRegEx = new RegExp('^(?:[a-z]+:)?//', 'i')
      if (!protocolRegEx.test(url)) {
        this.cellData.content = "http://" + url
      }
    }
	},
	props: {
		cell: {
			default: ''
    }
  },
	computed: {
		isText: function() {
			return this.cellData.type === 'text'
		},
		isTel: function() {
			return this.cellData.type === 'tel'
		},
		isUrl: function() {
			return this.cellData.type === 'url'
		},
		isNumber: function() {
			return this.cellData.type === 'number'
		},
		isTextarea: function() {
			return this.cellData.type === 'textarea'
    }
  }
}
</script>

<style scoped>
span {
  display: inline-block;
  vertical-align: top;
  margin-top: 14px
}
input,
textarea {
	padding: 4px;
	font-size: 0.9em;
	width: 400px;
  margin-top: 10px;
}

textarea {
	resize: none;
}

.form-error {
	box-shadow: 0px 0px 2px 2px orangered;
}
</style>