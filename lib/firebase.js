import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'
import 'firebase/storage'

if (!firebase.apps.length) {
  console.log(process.env)
  firebase.initializeApp({
    apiKey           : process.env.FIREBASE_API_KEY,
    authDomain       : process.env.FIREBASE_AUTH_DOMAIN,
    projectId        : process.env.FIREBASE_PROJECT_ID,
    serviceAccountId : process.env.FIREBASE_SERVICE_ACCOUNT_ID,
    storageBucket    : process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId            : process.env.FIREBASE_APP_ID,
    measurementId    : process.env.FIREBASE_MEASUREMENT_ID
  }) 
}

const storage = firebase.storage()
export { storage, firebase as default}
