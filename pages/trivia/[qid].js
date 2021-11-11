import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTriviaContext } from '../../contexts/TriviaContext'
import { Circles } from '@agney/react-loading'
import Question from "../../components/Question"

import theme from "../../theme.json";

const QuestionView = () => {
  const router = useRouter()
  const { qid } = router.query
  const { triviaContext, setTriviaContext } = useTriviaContext();
  const [ questionIndex, setQuestionIndex ] = useState(null);
  const [ question, setQuestion ] = useState(null);

  const colors = theme.colors;


  useEffect(() => {
    if (router && !triviaContext) {
        backToTriviaPage()
      }
  }, [])

  const backToTriviaPage = () => {
    router.push('/trivia')
  }

  const onQuestionAnswered = (answeredQuestion) => {
    setTriviaContext(triviaContext => {
        const [i, j] = matrixMapping(questionIndex)
        triviaContext[i][j] = answeredQuestion
        return triviaContext
    })
    backToTriviaPage()
  } 

  const matrixMapping = (index) => {
    if (index < 3) {
        return [0, index ]
    } else if (index >= 3 && index < 6) {
        return [1, index - 3]
    } else if (index >= 6 && index < 9) {
        return [2, index - 6]
    } 
  }

  useEffect(() => {
    let index
    const question = triviaContext && triviaContext.flat().filter((q, i) => {
        if (q.id === qid) {
            index = i
            return true
        }
        return false
    })
    setQuestion(question)
    setQuestionIndex(index)
  }, [])
 
  if (!question) {
    return <div className="content-center mx-auto w-28 mt-28">
                <Circles width="110" height="120" color={colors.white} />
            </div>
  }
    return (
      <div className="flex flex-col w-[100vw] mx-auto">
        <div className="flex flex-col mx-auto mt-2 self-center w-[100vw] h-auto">
          <div className="relative h-auto">
            <h1 className="w-64 mx-auto p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
              back to summer
            </h1>
          </div>
          <Question data={question[0]} questionAnsweredCb={onQuestionAnswered}/> 
        </div>
      </div> 
    )
}


export default QuestionView