
import {getUsers, deleteUsers} from "../../lib/apiAuth";

export default async function handler(req, res) {
    let userIds = []
    await getUsers().then((result) => {
        const users = result.users
        users.map((user) => {
            userIds.push(user?.uid)
        })
    })
    await deleteUsers(userIds).then(response => {
        res.status(200).json("DELETED")
    })
        
  }
  