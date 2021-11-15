import { read } from "../../lib/sheetReader"
import {signUpWithEmailAndPass} from "../../lib/apiAuth.js";
import { getUser } from '../../lib/db'

const getAuthDataAndStore = async () => {
  const url = process.env.NEXT_PUBLIC_USERS_SHEEET_URL
  let usersCreated = 0

  await read(url).then(async (users) => {
    console.log(users.length)
    await  users.map(async (user) => {
      const name = `${user.NOMBRE} ${user.APELLIDO}`
      const company = user.EMPRESA
      console.log(name)
      await signUpWithEmailAndPass({email: user.MAIL, pass:user.CODIGO, name, company})
      .then((response) => {
        //console.log(response.displayName)
        usersCreated++
      })
    })
  return users
})
};

export default async function handler(req, res) {
  const users = await getAuthDataAndStore()
  console.log("USERS CREATED")
  if (res.statusCode == 200) {
    return res.status(200).json(users);
  } else {
    return res.status(500).json({
      message: 'Error 500 - H',
    });
  }
}