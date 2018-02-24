<template>
  <label>
    <!-- wrapping the whole thing in the label is good for accessibility -->
    <span>{{cell.label}}</span> <br />
    <!-- we cannot dynamically assign types to form inputs in vue, so: -->
    <input @input="input" v-model="content" v-if="isText" type="text" /> 
    <input v-if="isUrl" type="url" /> 
    <input v-if="isTel" type="tel" /> 
    <input v-if="isNumber" type="number" />
    <textarea v-if="isAddress" />
  </label>
</template>

<script>
  export default {
    data() {
      return {
        content: ''
      }
    },
    methods: {
      input (element) {
        this.$emit('entered', this.content)
        console.log('inputted')
      }
    },
    props: {
      cell: {
        type: Object,
        default: () => {
          return {type: 'text', content: '', label: 'Default'}
          } 
      }
    },
    computed: {
      isText: function() {
        return this.cell.type === 'text'
      },
      isTel: function() {
        return this.cell.type === 'tel'
      },
      isUrl: function() {
        return this.cell.type === 'url'
      },
      isNumber: function() {
        return this.cell.type === 'number'
      },
      isAddress: function() {
        return this.cell.label === 'Address'
      }      
    }
  }
</script>

<style scoped>
input,
textarea,
.date-input {
	padding: 10px;
	font-size: 0.9em;
	width: 100%;
}

textarea {
	resize: none
}

</style>