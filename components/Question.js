import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image'
import { setAnswer } from "../lib/db"
import classnames from "classnames";
import VideoEmbed from "./VideoEmbed";
import useAudio from "../hooks/useAudio";
import { useAuth } from "../lib/auth.js";
import { TYPES } from "../utils/questionFormValues"
import Countdown from "./Countdown";
import CheckCircle from "../icons/CheckCircle";
import XCircle from "../icons/XCircle";
import Heading from "../ui/Heading";

export default function Question({ data, questionAnsweredCb }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [question, setQuestion] = useState(data);
    const [timeUsed, setTimeUsed] = useState(null);
    const audioRef = useRef(null)
    const { user, updateUserProfile } = useAuth();

    useEffect(( )=> {
      if (timeUsed) {
        user.timeUsed += timeUsed
      }

      if (question.answered && timeUsed) {
        if (question.type == TYPES.AUDIO) {
          audioRef.current.pause()
        }
      
        const score = question.isCorrect ? question.points : (question.points / 2) * -1
        
        const data = {
          timeUsed: user.timeUsed,
          score: user.score + score,
          answeredQuestions: user.answeredQuestions ? 
            user.answeredQuestions.push(question.id) 
            : user.answeredQuestions = [question.id]
        }
        setAnswer(user.id, data)
      }
      
    }, [timeUsed])

    useEffect(() => {
      if (question.answered) {
        setTimeout(() => {
          console.log("Pregunta respondida!")
          questionAnsweredCb(question)
        }, 2000)
      }
    }, [question])
  
    
  
    const { toggle: playError } = useAudio("/sounds/error.mp3", 0.2);
    const { toggle: playSuccess } = useAudio("/sounds/success.mp3", 0.9);
  

    const onTimerEnded = () => {
      playError();
      setSelectedOption(null);
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
  
    return (
      <div className="flex flex-col justify-between h-[100vh]">
        <div className="mb-4 mx-auto w-full bg-blue-500">
          <Heading className="text-3xl font-helvetica" color="white">{question.description}</Heading>
          <div className="relative p-2 m-2 w-full sm:w-3/5 h-80 mx-auto ">
            <div className="absolute top-[-20px] right-[-20px] z-10 w-[80px] h-[80px] ">
              <Countdown time={20} shouldRun={!question.answered} onFinish={onTimerEnded} onTimerStop={setTimeUsed}/>
            </div>
            { question.type == 'image' && question.imageUrl &&
                    <Image 
                      src={question.imageUrl}
                      alt="Imagen para la pregunta"
                      layout="fill"
                      objectFit="contain"
                      priority="true"
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
          </div>
        </div>
        <ul className="flex flex-wrap justify-between w-3/4 md:h-52 mx-auto mt-2">
          {question.options.map((option, index) => (
            <li key={option.id} className="w-5/6 md:w-1/2 mx-auto p-2">
              <button
                className="flex w-full"
                onClick={e =>{ onQuestionAnswered(option)}}
                disabled={!!selectedOption}
              >
                <div
                  className={classnames([
                    "flex justify-between items-center w-full h-12 md:h-16 px-4 py-2 bg-white border text-secondary text-xl text-left rounded",
                    question.answered &&
                      question.validOption === option.id &&
                      "bg-green-300",
                    question.answered &&
                      question.validOption !== option.id &&
                      "bg-red-300",
                    question.answered && option.id !== selectedOption?.id && "opacity-50",
                  ])}
                >
                  <span className="font-bold ml-2">{option.content}</span>
                  {question.answered && question.validOption === option.id && (
                    <CheckCircle className="h-6 mr-4" />
                  )}
                  {question.answered && question.validOption !== option.id && (
                    <XCircle className="h-6 mr-4" />
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
        <div className="w-[75vw] h-[10vh] flex justify-items-center self-center">
        </div>
      </div>
    );
  }
  