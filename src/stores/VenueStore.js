import firebase from 'firebase'

const VenueStore = {
  data: {
    thing: "hello I'm the store"
  },
  methods: {
    getUserVenues(vm) {
      		const userVenuesRef = firebase
            .database()
            .ref(
              'users/' + firebase.auth().currentUser.uid + '/venues'
          )
          userVenuesRef.on('value', function(snap) {
            if (snap.val() !== null) {
              const vals = snap.val()
              vm.userVenues = []
              vals.forEach(val => {
                vm.userVenues.push(val)
              })
              vm.dataLoaded = true

              vm.userVenues.sort(function(a, b) {
                var textA = a.Venue.toUpperCase()
                var textB = b.Venue.toUpperCase()
                return textA < textB ? -1 : textA > textB ? 1 : 0
              })
              userVenuesRef.set(snap.val())
            } else {
              getDefaultVenues()
            }
          })
          function getDefaultVenues() {
            const defaultVenues = firebase
              .database()
              .ref('default-venues')
            defaultVenues.on('value', function(snap) {
              const vals = snap.val()
              vm.userVenues = []
              vals.forEach(val => {
                vm.userVenues.push(val)
              })

              vm.userVenues.sort(function(a, b) {
                var textA = a.Venue.toUpperCase()
                var textB = b.Venue.toUpperCase()
                return textA < textB ? -1 : textA > textB ? 1 : 0
              })

              userVenuesRef.set(snap.val())
              vm.dataLoaded = true
            })
          }
    }
  }
}

export default VenueStore