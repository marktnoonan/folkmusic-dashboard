<template>
  <div class="hello">
    <h1>Folkmusic.com Dashboard</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Adding a show</h2>
    <AddShowForm 
    @submit="submitShow"
    @update="handleEmit"
    />
    <StandardButton :onClick="logout">Log Out</StandardButton>
<br><br>

  </div>
</template>

<script>
import firebase from 'firebase'
import AddShowForm from './AddShowForm'
import StandardButton from './StandardButton'

export default {
  name: 'Dashboard',
  data () {
    return {
      safeToAddShow: false
      } 
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    handleEmit(cellsFromChild){
      console.log("thing emitted!")
      console.log(cellsFromChild);
      
    },
    submitShow: function (showCells) {
      console.log("submitting")
          if (showCells[7].content !== ''&& showCells[8].content !== '') {
            this.safeToAddShow = true;
          } 
          if (this.safeToAddShow) {
      let rowContent = showCells.map((cell) => {
        return cell.content
      })
      const showRef = firebase.database().ref("showsToAdd")
      const archiveRef = firebase.database().ref("formSubmissions")
      showRef.push(rowContent)
      archiveRef.push(rowContent)
    }
    }
  },
  components: {
    AddShowForm,
    StandardButton
  }
}

</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: rgb(21, 95, 105);
}


</style>
