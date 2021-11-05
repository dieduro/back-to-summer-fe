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
        console.log(99, response.email)
          if(response) { usersCreated++}
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