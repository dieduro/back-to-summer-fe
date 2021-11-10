
import Link from 'next/link'
import { CATEGORIES } from "../utils/questionFormValues"
import CheckCircle from '../icons/CheckCircle'
import XCircle from '../icons/XCircle'

export default function QuestionBox({data}) {

  const COLOR_CATEGORY = {
    [CATEGORIES[0].value]: 'bg-yellow',
    [CATEGORIES[1].value]: 'bg-orange',
    [CATEGORIES[2].value]: 'bg-red', 
  }
  const backgroundColor = COLOR_CATEGORY[data.category]
  const opacity = data.answered ? 'bg-opacity-40' : 'bg-opacity-100' 
  return (
    <>
    {data.description ? 
     !data.answered ?
    (   
      <Link href={!data.answered ? `/trivia/${data.id}` : ''}  disabled={data.answered} className={data.answered ? 'pointer-events-none' : '' }>
        <div className={`flex flex-col content-center justify-center ${backgroundColor} ${opacity} w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36 px-2 overflow-hidden`}>
            <h3 className="h-8 w-1/2 mx-auto text-center align-middle sm:text-2xl md:text-3xl text-white font-helvetica">{data.points}</h3>
        </div>
      </Link> )
      : (
        <div className={`flex flex-col content-center justify-center bg-dark ${opacity} w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36 px-2 overflow-hidden`}>
            { data.isCorrect ? <CheckCircle/> : <XCircle fillColor="red" />}
        </div>
      )
    : (
      <div className="w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36 px-2 overflow-hidden border border-black border-dashed"></div>
    )}
    </>
  );
}
