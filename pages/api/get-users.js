
import {getUsers} from "../../lib/apiAuth";

export default async function handler(req, res) {
    console.log("GET USERS")
    let userIds = []
    await getUsers().then((result) => {
        const users = result.users
        console.log(users)
        res.status(200).json(users)
    })
        
  }
  