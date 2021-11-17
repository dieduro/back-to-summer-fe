import { read } from "../../../lib/sheetReader"

const getUserData = async (email) => {
    const url = process.env.NEXT_PUBLIC_USERS_SHEEET_URL
    let userData
    await read(url).then(async (users) => {
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            if (user.MAIL === email) {
                userData =
                {
                    name: `${user.NOMBRE} ${user.APELLIDO}`,
                    company: user.EMPRESA
                }
                break
            }
        }
    })
    return userData
};

export default async function handler(req, res) {
    const email = req.query.email
    const data = await getUserData(email)

    if (res.statusCode == 200) {
      return res.status(200).json(data);
    } else {
        return res.status(500).json({
            message: 'Error 500 - H',
        });
    }
}