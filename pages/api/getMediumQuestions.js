import { getQuestions } from '../../lib/db'

export default async function handler(req, res) {
  try {
    let midDifficultyQuestions = []
    await getQuestions().then(result => {
      result.questions.filter(question => {
        if (question.difficulty === 'MEDIA') {
          midDifficultyQuestions.push(question)
        }
      })
      res.status(200).json(midDifficultyQuestions)
    })
  } catch (error) {
    console.log(error)
  }

}
  