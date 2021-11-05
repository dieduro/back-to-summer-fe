
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
        console.log(response.users.length)
    })
    console.log(456, res.statusCode)
    if (res.statusCode == 200) {
        return res.status(200).json({
            message: "Users deleted successfully"
        });
    } else {
        return res.status(500).json({
            message: 'que habra fallado aca viejo!?',
        });
    }
        
  }
  