import { getQuestions } from '../../lib/db'

export default async function handler(req, res) {
  try {
    await getQuestions().then(result => {
      res.status(200).json(result.questions)
    })
  } catch (error) {
    console.log(error)
  }

}
  