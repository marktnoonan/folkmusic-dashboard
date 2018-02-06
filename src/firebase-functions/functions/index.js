const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
const db = admin.database()


const FUNCTIONS_CLIENT_ID = functions.config().googleapi.client_id
const FUNCTIONS_SECRET_KEY = functions.config().googleapi.client_secret
const FUNCTIONS_REDIRECT =
  'https://us-central1-folkmusic-dashboard.cloudfunctions.net/OauthCallback'

const googleAuth = require('google-auth-library')
const google = require('googleapis')


const auth = new googleAuth()
const functionsOauthClient = new auth.OAuth2(
  FUNCTIONS_CLIENT_ID,
  FUNCTIONS_SECRET_KEY,
  FUNCTIONS_REDIRECT
)

let oauthTokens = null;
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
          return "trigger ran"
    }
    show[1] = "test cloud"
    show.triggerRan = true
    // .set() returns a promise so making it the return value of the function ensures we wait till it completes.
    return event.data.ref.set(show) 
  })



// checks if oauthTokens have been loaded into memory, and if not, retrieves them
function getAuthorizedClient() {
  console.log("authorizing...");
  
  return new Promise((resolve, reject) => {
    if (oauthTokens) {
      console.log("tokens found...");
      return resolve(functionsOauthClient);
    }
          console.log("NO tokens found...");

    db.ref(DB_TOKEN_PATH).once('value').then((snapshot) => {
      oauthTokens = snapshot.val();
      console.log(oauthTokens);
      
      functionsOauthClient.credentials = oauthTokens;
      return resolve(functionsOauthClient);
    }).catch((err) => {
      console.log("failed to get authclient");
      console.log(err);
      reject();
    });
  });
}

// accepts an append request, returns a Promise to append it, enriching it with auth
function appendPromise(requestWithoutAuth) {
  console.log(requestWithoutAuth);
  
  return new Promise((resolve, reject) => {
    getAuthorizedClient().then((client) => {
      console.log("connecting to sheets... ");
      console.log(client);
      
      const sheets = google.sheets('v4');
      console.log(sheets);
      
      const request = requestWithoutAuth;
      request.auth = client;
      request.valueInputOption = 'USER_ENTERED';
      sheets.spreadsheets.values.append(request, (err, response) => {
        if (err) {
          console.log(`The API returned an error: ${err}`);
          return reject();
        }
        return resolve(response);
      });
    }).catch(() => reject());
  });
}

const SHEET_ID = '1qBzb28aANiAScJbuDuAmeOukUzZQiIP6wZapF2bPMgw'
const DATA_PATH = '/users/0N9SNPfstqftKscuZ5AaqWHMAzp2/showsToAdd'

// trigger function to write to Sheet when new data comes in on DATA_PATH
exports.appendRecordToSpreadsheet = functions.database.ref(`${DATA_PATH}/{ITEM}`).onWrite(
  (event) => {
    const newRecord = event.data.current.val();
    console.log(newRecord);
    return appendPromise({
      spreadsheetId: SHEET_ID,
      range: 'testo-sheet!A:I',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        range: 'testo-sheet!A:I',
        values: [
          newRecord
        ]
      }
    })
});

// HTTPS function to write new data to DATA_PATH, for testing
exports.testSheetWrite = functions.https.onRequest((req, res) => {
  const random1 = Math.floor(Math.random() * 100);
  const random2 = Math.floor(Math.random() * 100);
  const random3 = Math.floor(Math.random() * 100);
  const ID = new Date().getUTCMilliseconds();
  return db.ref(`${DATA_PATH}/${ID}`).set({
    firstColumn: random1,
    secondColumn: random2,
    thirdColumn: random3
  }).then(() => res.status(200).send(
    `Wrote ${random1}, ${random2}, ${random3} to DB, trigger should now update Sheet.`));
});