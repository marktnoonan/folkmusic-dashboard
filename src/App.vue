<template>
  <div id="app">
    <h1 class="main-title">Folkmusic.com Dashboard</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
  }
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 10px;
}
.date-input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  color: #000;
  border: 1px solid #575757;
}
.main-title {
  margin-bottom: 0;
}

* {
  box-sizing: border-box;
  border-radius: 6px;
}

input {
    border: 1px solid #575757;
}

</style>
