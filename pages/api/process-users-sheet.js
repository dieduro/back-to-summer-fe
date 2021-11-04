import { read } from "../../lib/sheetReader"
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

export default async function handler(req, res) {
  const users = await getAuthDataAndStore()
  console.log("USERS CREATED")
  console.log(222, res)
  res.status(200).json('Users created: ', users)
}