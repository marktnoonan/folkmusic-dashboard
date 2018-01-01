<template>
    <button @click="onClick">
      <slot>
        Button with no text content!
      </slot>
    </button>
</template>
<script>
export default {
  props: {
      onClick: {
      default: function(){
        return
      },
      type: Function,
      required: false
    }
  }
}
</script>


<style scoped>
button {
  display: inline-block;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  font-size: 14px;
  border: 0;
  border-radius: 4px;
  background-color: powderblue
}
button:hover {
  background-color: lightgrey
}


</style>