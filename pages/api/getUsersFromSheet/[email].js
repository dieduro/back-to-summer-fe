import { read } from "../../../lib/sheetReader"

const getCompany = async (email) => {
    const url = process.env.NEXT_PUBLIC_USERS_SHEEET_URL
    let company
    await read(url).then(async (users) => {
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            if (user.MAIL === email) {
                console.log(user)
                company = user.EMPRESA
                break
            }
        }
    })
    return company
};

export default async function handler(req, res) {
    const email = req.query.email
    const company = await getCompany(email)
    if (res.statusCode == 200) {
      return res.status(200).json({company});
    } else {
        return res.status(500).json({
            message: 'Error 500 - H',
        });
    }
}