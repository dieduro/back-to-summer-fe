import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTriviaContext } from '../../contexts/TriviaContext'
import { matrixMapping } from '../../utils/helpers'
import { Circles } from '@agney/react-loading'
import Question from "../../components/Question"
import ConfirmationPopup from '../../components/ConfirmationPopup'

import theme from "../../theme.json";

const QuestionView = () => {
  const router = useRouter()
  const { qid } = router.query
  const { triviaContext, setTriviaContext } = useTriviaContext();
  const [ question, setQuestion ] = useState({index: null, data: null});
  const [ popupOpen, setPopupOpen ] = useState(false);
  const [ wrongAnswer, setWrongAnswer ] = useState(false);

  const colors = theme.colors;


  useEffect(() => {
    if (router && !triviaContext) {
        backToTriviaPage()
      }

    router.beforePopState(({ url, as, options }) => {
      setPopupOpen(true)
      return false
    })
  }, [])


  const backToTriviaPage = () => {
    router.push('/trivia')
  }

  const onQuestionAnswered = (answeredQuestion) => {
    setTriviaContext(triviaContext => {
      const [i, j] = matrixMapping(question.index)
      triviaContext[i][j] = answeredQuestion
      return triviaContext
    })
    backToTriviaPage()
  }

  const popupActions = {
    acceptCb: () => {
      setWrongAnswer(true)
    },
    cancelCb: () => {
      setPopupOpen(false)
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
    setQuestion({index: index, data: question})
  }, [])
 
  if (!question.data) {
    return <div className="content-center mx-auto w-28 mt-28">
                <Circles width="110" height="120" color={colors.white} />
            </div>
  }

  return (
    <div className="flex flex-col w-[100vw] mx-auto">
      <div className={`flex flex-col mx-auto mt-2 self-center w-[100vw] h-auto `}>
        <div className="relative h-auto">
          <h1 className="w-64 mx-auto p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
            back to summer
          </h1>
        </div>
        { popupOpen &&
          <ConfirmationPopup actions={popupActions}/>
        }
        <Question data={question.data[0]} index={question.index} forceWrongAnswer={wrongAnswer} questionAnsweredCb={onQuestionAnswered}/> 
      </div>
    </div> 
  )
}


export default QuestionView