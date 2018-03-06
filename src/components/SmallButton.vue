<template>
    <button @click="onClick">
      <slot>
        Small button with no text content!
      </slot>
    </button>
    
</template>
<script>
import {ClickHandlerAsProp} from '../helpers'

export default {
	props: {
		onClick: ClickHandlerAsProp
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
