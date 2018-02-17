<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        @click="remainOpen"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Note
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
    		<small-button 
          type="button" 
          :onClick="close" 
          class="reset">OK</small-button> 

          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
// based on https://alligator.io/vuejs/vue-modal-component

import SmallButton from './SmallButton'

  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
      remainOpen(e){
        e.stopPropagation()
      }
    },
    components: {
      SmallButton
    }
  };
</script>

<style>
  .modal-backdrop {
    z-index: 1000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 0 0 10px -1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }


  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
