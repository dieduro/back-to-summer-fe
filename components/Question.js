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

export default function Question({ data, index, questionAnsweredCb }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [question, setQuestion] = useState(data);
    const [timeUsed, setTimeUsed] = useState(0);
    const [user, setUser] = useState(useAuth().user);
    const audioRef = useRef(null)

    // remove timeUsed state
    // plug it into question state

    useEffect(()=> {
      console.log("TIME USED: ", timeUsed)
      if (timeUsed) {
        console.log(55, typeof(user.timeUsed))
        user.timeUsed += timeUsed
      }

      if (question.answered && timeUsed) {
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
        console.log(8181, user)
        const activeTrivia = JSON.parse(user.trivia)
        const [row, col] = matrixMapping(index)
        activeTrivia[row][col].answered = true
        activeTrivia[row][col].isCorrect = question.isCorrect

        const data = {
          timeUsed: user.timeUsed,
          score: parseInt(user.score) + parseInt(score),
          answeredQuestions: answeredQuestions,
          trivia: JSON.stringify(activeTrivia)
        }
        console.log(567, user)
        setAnswer(user.uid, data)
      }
      
    }, [timeUsed])

    useEffect(async () => {
      const userData = await getUserData(user.uid)
      setUser(userData)
      if (question.answered) {
        setTimeout(() => {
          console.log("Pregunta respondida!")
          questionAnsweredCb(question)
        }, 2000)
      }
    }, [question])
  
    
  
    const { toggle: playError } = useAudio("/sounds/error.mp3", 0.2);
    const { toggle: playSuccess } = useAudio("/sounds/success.mp3", 0.9);
  

    const onTimerEnded = (time) => {
      console.log("Timer ended!")
      playError();
      setSelectedOption(null);
      setTimeUsed(time);
      setQuestion({
        ...question,
        answered: true,
        isCorrect: false,
      });
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

    const isOnlyTextQuestion = question.type == TYPES[0].value 
    const containerHeight = !isOnlyTextQuestion ? 'h-80' : ''
    const countdownStyle = classnames([isOnlyTextQuestion ? 
      'relative mx-auto' : 'absolute top-[-25px] right-[-25px]', 
      ' z-10 w-[100px] h-[100px]']) 
  
    return (
      <div className="flex flex-col w-11/12 lg:w-3/5 mx-auto justify-between ">
        <div className="mb-4 mx-auto w-full">
          <Heading className="text-3xl font-helvetica font-semibold w-4/5 mx-auto" color="white">{question.description}</Heading>
          <div className={`relative p-2 mt-6 w-full sm:w-3/5 ${containerHeight} mx-auto`}>
            { question.type == 'image' && question.imageUrl &&
              <Image 
                src={question.imageUrl}
                alt="Imagen para la pregunta"
                layout="fill"
                objectFit="contain"
                priority
                onLoadingComplete={e => {console.log("Load complete")}}
              /> 
            }
            {
              question.type == 'video' && question.videoUrl &&
              <VideoEmbed url={question.videoUrl}/>
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
            <div className={countdownStyle}>
              <Countdown time={20} shouldRun={!question.answered} onFinish={onTimerEnded} onTimerStop={setTimeUsed}/>
            </div>
          </div>
        </div>
        <ul className="flex flex-wrap justify-between w-full lg:w-3/4 md:h-52 mx-auto mt-2">
          {question.options.map((option, index) => (
            <li key={option.id} className="w-4/6 md:w-1/2 mx-auto p-2">
              <button
                className="flex w-full"
                onClick={e =>{ onQuestionAnswered(option)}}
                disabled={!!selectedOption}
              >
                <div
                  className={classnames([
                    "flex justify-between items-center w-full h-16 md:h-16 px-4 py-2 bg-white text-secondary text-xl text-left rounded-full",
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
  