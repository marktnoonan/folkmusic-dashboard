const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
const db = admin.database()


const FUNCTIONS_CLIENT_ID = functions.config().googleapi.client_id
const FUNCTIONS_SECRET_KEY = functions.config().googleapi.client_secret
const FUNCTIONS_REDIRECT =
  'https://us-central1-folkmusic-dashboard.cloudfunctions.net/OauthCallback'
// TODO: use firebase functions:config:set to configure your Google API client ID and secret
// Also update FUNCTIONS_REDIRECT

const googleAuth = require('google-auth-library')

const auth = new googleAuth()
const functionsOauthClient = new auth.OAuth2(
  FUNCTIONS_CLIENT_ID,
  FUNCTIONS_SECRET_KEY,
  FUNCTIONS_REDIRECT
)

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

// visit the URL for this Function to obtain tokens
exports.authGoogleAPI = functions.https.onRequest((req, res) =>
  res.redirect(
    functionsOauthClient.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent'
    })
  )
)

// after you grant access, you will be redirected to the URL for this Function
// this Function stores the tokens to your Firebase database
const DB_TOKEN_PATH = '/api_tokens'
exports.OauthCallback = functions.https.onRequest((req, res) => {
  const code = req.query.code
  functionsOauthClient.getToken(code, (err, tokens) => {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if (err) {
      return res.status(400).send(err)
    }
    return db
      .ref(DB_TOKEN_PATH)
      .set(tokens)
      .then(() => res.status(200).send('OK'))
  })
})


exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
  console.log('message for the console!')
})

exports.dbTriggerTest = functions.database
  .ref('/users/0N9SNPfstqftKscuZ5AaqWHMAzp2/showsToAdd/{pushId}')
  .onWrite(event => {
    console.log('Trigger Test ran' + event.params)    
    const show = event.data.val()
    if (show.triggerRan) {
          return
    }
    show[1] = "test cloud"
    show.triggerRan = true
    // .set() returns a promise so making it the return value of the function ensures we wait till it completes.
    return event.data.ref.set(show) 
  })


