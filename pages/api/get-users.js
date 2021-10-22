
import admin from "../../lib/firebase-admin"

export default async function handler(req, res) {
    console.log("GET USERS")
    await admin.auth().getUsers([{ uid: '34a47fa4-a0a8-43a9-9537-7d68b7018854' }]).then((users) => {
        res.status(200).json(users)})
  }
  