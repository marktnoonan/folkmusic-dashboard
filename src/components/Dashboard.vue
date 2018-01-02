<template>
  <div class="hello">
    <h1>Folkmusic.com Dashboard</h1>
    <standard-button :onClick="logout">Log Out</standard-button><br>
      <standard-button :onClick="toggleAddShowForm">Add A Show </standard-button>
    <AddShowForm 
    v-if="displayAddShowForm"
    @submit="submitShow"
    />
    {{successMessage}}
<br><br>

  </div>
</template>

<script>
import firebase from "firebase";
import AddShowForm from "./AddShowForm";
import StandardButton from "./StandardButton";

export default {
	name: "Dashboard",
	data() {
		return {
			safeToAddShow: false,
      displayAddShowForm: false,
      successMessage: ''
		};
	},
	methods: {
		logout: function() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.replace("login");
				});
		},
		toggleAddShowForm() {
			this.displayAddShowForm = !this.displayAddShowForm;
		},
		submitShow: function(showCells) {
			if (showCells[7].content !== "" && showCells[8].content !== "") {
				this.safeToAddShow = true;
			}
			if (this.safeToAddShow) {
				let rowContent = showCells.map(cell => {
					return cell.content;
        });
        // format the date
        let date = new Date(rowContent[0])
        rowContent[0] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

				const showRef = firebase.database().ref("showsToAdd");
				const archiveRef = firebase.database().ref("formSubmissions");

        showRef.push(rowContent, function(error) {
					if (error) {
            alert("There was an error saving this show.");
            // if there is an error we need to keep this showCells object and retry.
            // unless firebase does that automatically.
					} else {
						console.log("Data saved successfully.")
					}
				});
        
        archiveRef.push(rowContent);
			} else {
				alert("Please check the address");
			}
		}
	},
	components: {
		AddShowForm,
		StandardButton
	}
};
</script>

<style scoped>
h1,
h2 {
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
