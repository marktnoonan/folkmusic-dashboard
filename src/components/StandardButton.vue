<template>
    <button @click="onClick">
      <slot>
        Button with no text content!
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
	padding: 10px;
	font-size: 14px;
}
</style>
