import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey           : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain       : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId        : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    serviceAccountId : process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_ID,
    storageBucket    : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId            : process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId    : process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  }) 
}

const storage = firebase.storage()
export { storage, firebase as default}
