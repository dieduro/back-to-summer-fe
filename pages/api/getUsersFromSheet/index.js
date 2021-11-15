import { read } from "../../../lib/sheetReader"

const getUsers = async () => {
  const url = process.env.NEXT_PUBLIC_USERS_SHEEET_URL
  let users

  await read(url).then(async (result) => {
    users = result
  })
  
  return users
};

export default async function handler(req, res) {

    console.log("get users from sheet handler")
    const users = await getUsers()
    if (res.statusCode == 200) {
      return res.status(200).json(users);
    } else {
        return res.status(500).json({
            message: 'Error 500 - H',
        });
    }
}