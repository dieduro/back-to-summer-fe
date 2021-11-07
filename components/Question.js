import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image'
import Router from "next/router";
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
    const [score, setScore] = useState(null);
    const [timeUsed, setTimeUsed] = useState(null);
    const audioRef = useRef(null)

    useEffect(( )=> {
      if (timeUsed) {
        currentQuestion.timeUsed = timeUsed
      }

      if (answered && timeUsed) {
        if (currentQuestion.type == TYPES.AUDIO) {
          audioRef.current.pause()
        }
        // db call to store answers, time and generate score
      }
    }, [timeUsed])
  
    const { updateUserProfile } = useAuth();
  
    const { toggle: playError } = useAudio("/sounds/error.mp3", 0.2);
    const { toggle: playSuccess } = useAudio("/sounds/success.mp3", 0.9);
    const { toggle: toggleBackground } = useAudio("/sounds/background.mp3", 0.1);
    const [answered, setAnswered] = useState(false);
    const [ms, setMs] = useState(0);
  
    const onFinish = (finalScore) => {
      setScore(finalScore);
  
      updateUserProfile({
        status: "finished",
        score: finalScore,
      });
    };

    const onTimerEnded = () => {
      playError();
      setSelectedOption(null);
      setAnswered(true);
    }

    const onQuestionAnswered = (option) => {
      setSelectedOption(option);
      setAnswered(true);

      if (currentQuestion.validOption === option.id) {
        playSuccess();
      } else {
        playError();
      }

      setTimeout(() => { questionAnsweredCb() }, 2000);
    }
  
    const currentQuestion = data;
  
    return (
      <div className="flex flex-col justify-between h-[100vh]">
        <div className="w-[100px] h-[100px] mr-0 ml-auto">
          <Countdown time={20} shouldRun={!answered} onFinish={onTimerEnded} onTimerStop={setTimeUsed}/>
        </div>
        <div className="mb-4 mx-auto w-full">
          <Heading className="text-3xl" color="white">{currentQuestion.description}</Heading>
          <div className="relative p-2 m-2 w-full sm:w-3/5 h-80 mx-auto ">
            { currentQuestion.type == 'image' && currentQuestion.imageUrl &&
                    <Image 
                      src={currentQuestion.imageUrl}
                      alt="Imagen para la pregunta"
                      layout="fill"
                      objectFit="contain"
                      priority="true"
                      onLoadingComplete={e => {console.log("Load complete")}}
                    /> 
            }
            {
              currentQuestion.type == 'video' && currentQuestion.videoUrl &&
              <VideoEmbed url={currentQuestion.videoUrl}/>
            }
            {
              currentQuestion.type == 'audio' && currentQuestion.audioUrl &&
                <div className="w-4/5 mx-auto mt-4">
                  <audio className="mx-auto" controls autoPlay ref={audioRef}>
                      <source src={currentQuestion.audioUrl} type="audio/mpeg"/>
                      <source src={currentQuestion.audioUrl} type="audio/ogg"/>
                  </audio>
                </div>
            }
          </div>
        </div>
        <ul className="flex flex-wrap justify-between w-3/4 md:h-52 mx-auto mt-2">
          {currentQuestion.options.map((option, index) => (
            <li key={option.id} className="w-5/6 md:w-1/2 mx-auto p-2">
              <button
                className="flex w-full"
                onClick={e =>{ onQuestionAnswered(option)}}
                disabled={!!selectedOption}
              >
                <div
                  className={classnames([
                    "flex justify-between items-center w-full h-12 md:h-16 px-4 py-2 bg-white border text-secondary text-xl text-left rounded",
                    answered &&
                      currentQuestion.validOption === option.id &&
                      "bg-green-300",
                    answered &&
                      currentQuestion.validOption !== option.id &&
                      "bg-red-300",
                    answered && option.id !== selectedOption?.id && "opacity-50",
                  ])}
                >
                  <span className="font-bold ml-2">{option.content}</span>
                  {answered && currentQuestion.validOption === option.id && (
                    <CheckCircle className="h-6 mr-4" />
                  )}
                  {answered && currentQuestion.validOption !== option.id && (
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
  