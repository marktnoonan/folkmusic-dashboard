<template>
    <button @click="onClick">
      <slot>
        Small button with no text content!
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
@import '../css/button-base-styles.css';

button {
  padding: 3px;
  font-size: 12px;
  }

</style>