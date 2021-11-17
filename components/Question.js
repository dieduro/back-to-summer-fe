import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image'
import { setAnswer, getUserData } from "../lib/db"
import { useAuth } from "../lib/auth.js";
import { TYPES } from "../utils/questionFormValues"
import { matrixMapping } from '../utils/helpers'
import useAudio from "../hooks/useAudio";
import classnames from "classnames";

import VideoEmbed from "./VideoEmbed";
import Countdown from "./Countdown";
import CheckCircle from "../icons/CheckCircle";
import XCircle from "../icons/XCircle";
import Heading from "../ui/Heading";
import { Circles } from "@agney/react-loading";
import theme from "../theme.json";

export default function Question({ data, index, forceWrongAnswer, questionAnsweredCb }) {

    const [selectedOption, setSelectedOption] = useState(null);
    const [question, setQuestion] = useState(data);
    const isOnlyTextQuestion = question.type == TYPES[0].value 

    const [loadingMedia, setLoadingMedia ] = useState(!isOnlyTextQuestion)
    const [user, setUser] = useState(useAuth().user);
    const audioRef = useRef(null)

    const colors = theme.colors

    useEffect(async ()=> {

      if (forceWrongAnswer) {
        question.answered = true
        question.timeUsed = 10
        question.isCorrect = false
      }

      if (question.timeUsed) {
        user.timeUsed += question.timeUsed
      }

      if (question.answered && user.timeUsed > -1) {
        if (question.type == TYPES.AUDIO) {
          audioRef.current.pause()
        }
      
        const score = question.isCorrect ? question.points : (question.points / 2) * -1

        let answeredQuestions = user.answeredQuestions
        if (answeredQuestions)  {
          answeredQuestions.push(question.id) 
        } else {
          answeredQuestions[0] = question.id
        }
        const activeTrivia = JSON.parse(user.trivia)
        const [row, col] = matrixMapping(index)
        activeTrivia[row][col].answered = true
        activeTrivia[row][col].isCorrect = question.isCorrect
        const newCurrentResponses = user.currentResponses + 1
        const currentScore = parseInt(user.score) + parseInt(score)

        const data = {
          timeUsed: user.timeUsed,
          score: currentScore,
          answeredQuestions: answeredQuestions,
          trivia: JSON.stringify(activeTrivia),
          currentResponses : newCurrentResponses
        }

        if (newCurrentResponses == 9) {
          data.roundsPlayed = user.roundsPlayed + 1
          
          if (data.roundsPlayed == 1 ) {
            data.firstRoundScore = data.score
            data.bestScore = data.firstRoundScore
          } else if (data.roundsPlayed == 2) {
            data.secondRoundScore = data.score
            data.bestScore = user.bestScore > data.secondRoundScore ? user.bestScore : data.secondRoundScore
            data.status = 'finished'
          }
        }
        
        setAnswer(user.uid, data)

        if (question.answered) {
          setTimeout(() => {
            questionAnsweredCb(question)
          }, 2000)
        } 
      }
      
    }, [question.timeUsed, forceWrongAnswer])

    useEffect(async () => {
      const userData = await getUserData(user.uid)
      setUser(userData)
      
    }, [question])
  
    
    
    const { toggle: playError } = useAudio("/sounds/error.mp3", 0.2);
    const { toggle: playSuccess } = useAudio("/sounds/success.mp3", 0.9);
  
    const setTimeUsed = (timeUsed) => {
      setQuestion(
        {
          ...question,
          timeUsed: timeUsed
        }
      )
    }

    const onTimerEnded = (time) => {
      playError();
      setSelectedOption(null);
      setQuestion({
        ...question,
        timeUsed: time,
        answered: true,
        isCorrect: false,
      });
    }

    const mediaLoaded = () => {
      setLoadingMedia(false)
    }

    const onQuestionAnswered = (option) => {
      let answeredQuestion
      setSelectedOption(option);

      if (question.validOption === option.id) {
        playSuccess();
        answeredQuestion ={
          ...question,
          answered: true,
          isCorrect: true,
        };
      } else {
        playError();
        answeredQuestion = {
          ...question,
          answered: true,
          isCorrect: false,
        };
      }
      setQuestion(answeredQuestion);
    }

    const containerHeight = !isOnlyTextQuestion ? 'h-64 sm:h-80' : ''
    const countdownStyle = classnames([isOnlyTextQuestion ? 
      'relative mx-auto' : 'absolute top-[-25px] right-[-25px]', 
      ' z-10 w-[100px] h-[100px]']) 
    const mediaClassName = loadingMedia ? 'hidden' : 'transition'
  
    return (
      <div className="flex flex-col w-11/12 lg:w-3/5 mx-auto justify-between ">
          <div className="mb-2 mx-auto w-full">
            <Heading className="text-3xl font-helvetica font-semibold w-4/5 mx-auto" color="white">{question.description}</Heading>
            <div className='relative p-2 mt-4 w-full sm:w-4/6 h-full mx-auto'>
              { question.type == 'image' && question.imageUrl &&
                <div className={`relative ${containerHeight} ${mediaClassName}`}>
                  <Image 
                    src={question.imageUrl}
                    className={mediaClassName}
                    alt="Imagen para la pregunta"
                    layout="fill"
                    objectFit="contain"
                    priority
                    onLoadingComplete={mediaLoaded}
                  />
                </div>
              }
              {
                question.type == 'video' && question.videoUrl &&
                <div className={`w-full h-full ${mediaClassName}`}>
                  <VideoEmbed url={question.videoUrl} onLoadedDataCb={mediaLoaded} />
                </div>
              }
              {
                question.type == 'audio' && question.audioUrl &&
                  <div className="w-4/5 mx-auto mt-4">
                    <audio className="mx-auto" controls autoPlay ref={audioRef}>
                        <source src={question.audioUrl} type="audio/mpeg"/>
                        <source src={question.audioUrl} type="audio/ogg"/>
                    </audio>
                  </div>
              }
              {loadingMedia ? 
                  <div className={`${containerHeight} w-full flex items-center justify-center mx-auto`}> 
                    <Circles width="110" height="120" color={colors.white} />
                  </div>
                  : <div className={countdownStyle}>
                      <Countdown time={20} shouldRun={!question.answered} onFinish={onTimerEnded} onTimerStop={setTimeUsed}/>
                    </div>
                }
                
              
            </div>
          </div>
          <ul className="flex flex-wrap justify-between w-full lg:w-3/4 md:h-52 mx-auto mt-2">
            {question.options.map((option, index) => (
              <li key={option.id} className="w-4/6 md:w-1/2 mx-auto p-2">
                <button
                  className="flex w-full"
                  onClick={e =>{ onQuestionAnswered(option)}}
                  disabled={!!selectedOption || loadingMedia}
                >
                  <div
                    className={classnames([
                      "flex justify-between items-center w-full h-16 md:h-16 px-4 py-2 bg-white text-secondary text-md md:text-xl text-left rounded-full",
                      question.answered &&
                        question.validOption === option.id &&
                        "bg-green text-white",
                      question.answered &&
                        question.validOption !== option.id &&
                        "bg-red text-white",
                        question.answered && option.id == selectedOption?.id && "border border-black",
                    ])}
                  >
                    <span className="font-bold mx-auto">{option.content}</span>
                    {question.answered && question.validOption === option.id && (
                      <CheckCircle className="h-6 mr-4" fill="#FFFFFF" />
                    )}
                    {question.answered && question.validOption !== option.id && (
                      <XCircle className="h-6 mr-4" fill="#FFFFFF" />
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
      </div>
    );
  }
  