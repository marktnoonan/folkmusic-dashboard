<template>
  <div id="app">
    <header>      
    <h1 class="main-title">Folkmusic.com Dashboard</h1>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

header {
  background-color: rgb(180, 186, 186);
  padding: 10px 10px 0 10px;
  margin-top: 0;
}

.date-input {
  width: 100%;
  padding: 4px;
  font-size: 1em;
  color: #000;
  border: 1px solid #575757;
}
.main-title {
  margin: 0;
}

input,
textarea {
  box-sizing: border-box;
  border-radius: 3px;
}

input,
textarea {
  border: 1px solid #575757;
}
</style>
