import { read } from "../../../lib/sheetReader"
import {signUpWithEmailAndPass} from "../../../lib/apiAuth";

const getAuthDataAndStore = async () => {
  const url = process.env.NEXT_PUBLIC_USERS_SHEEET_URL
  let usersCreated = 0
  let users

  await read(url).then(async (result) => {
    users = result
    console.log(users.length)
  })

  await users.map(async (user) => {
    const name = `${user.NOMBRE} ${user.APELLIDO}`
    const company = user.EMPRESA
    await signUpWithEmailAndPass({email: user.MAIL, pass:user.CODIGO, name, company})
    .then((response) => {
      if (response) {usersCreated++}
      console.log(88, usersCreated)
    })
  })

  return usersCreated
};

export default async function handler(req, res) {
    console.log("SUPER HANDLER")
    const BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSwKH3JJWkqiVNjm8V4Ztzs_b8YfEZzbXgmVJzLGNhn_bezmqSRsyzGvwTfAAk2Bf6rE6zpk3HVuFrQ/pub?'
    const {url} = req.query
    console.log(`${BASE_URL}${url}`)
    const users = new Promise( async (resolve, reject) => {
        let usersCreated = await getAuthDataAndStore()
        resolve(usersCreated)
    })
    users.then(data => {console.log(55, data)})
    console.log("USERS CREATED: ", users)


    if (res.statusCode == 200) {
        return res.status(200).json(users);
    } else {
        return res.status(500).json({
        message: 'Error 500 - H',
        });
    }
}