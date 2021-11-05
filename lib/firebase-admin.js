import admin from 'firebase-admin'
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gu, '\n'),
      project_id: process.env.FIREBASE_PROJECT_ID
    }),
    databaseURL: 'YOUR_DATABASE_URL_HERE',
  })
}
export default admin
