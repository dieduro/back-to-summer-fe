import { read } from "../../lib/sheetReader"
import admin from "../../lib/firebase-admin"
import {signUpWithEmailAndPass} from "../../lib/apiAuth.js";

const getAuthDataAndStore = async () => {
  const url = process.env.NEXT_PUBLIC_USERS_SHEEET_URL
  let usersCreated = 0

  await read(url).then(async (users) => {
    await  users.map(async (user) => {
      const name = `${user.NOMBRE} ${user.APELLIDO}`
      await signUpWithEmailAndPass({email: user.MAIL, pass:user.CODIGO, name})
      .then((response) => {
          if(response) { usersCreated++}
      })
  })
})
  return usersCreated 
};

// const createUsersCollection = async (users) => {
//   users.map(async (user) => {
//     console.log(111,user)
//     await createUser(user.uid, {
//       email: user.email,
//       emailVerified: false,
//       displayName: user.name,
//       disabled: false,
//     })
//   })
// }

export default async function handler(req, res) {
    const users = await getAuthDataAndStore()
    console.log("USERS CREATED")
    res.status(200).json('Users created: ', users)
  }