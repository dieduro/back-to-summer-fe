import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useAuth } from "../lib/auth.js";
import { updateUser } from "../lib/db";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Question from "./Question.js";
import GridGame from "./GridGame.js"

const Game = ({ trivia }) => {
  const [gameState, setGameState] = useState("pre-game");
  const [question, setQuestion] = useState(null);
  const { user } = useAuth();
  
  let content = {};
  if (user) {
    if (user.status == "finished") {
      content = {
        title: "¡Gracias por haber completado la TribiTrivia!",
        buttonText: "Reset User",
        buttonCb: () => {
          resetUser();
        },
      };
    } else {
      if (gameState != "play" && trivia) {
        content = {
          title: "¡Bienvenido a la TribiTrivia!",
          buttonText: "Comenzar",
          buttonCb: () => {
            startTrivia();
          },
        };
      } else if (trivia.questions.length == 0) {
        content = {
          title: "No hay preguntas para contestar actualmente",
        };
      }
    }
}
  
  const onPlayQuestion = (data) => {
    setQuestion(data)
  }

  const onBackFromQuestion = () => {
    setQuestion(question => {
      console.log(44, question)
      console.log(55, trivia)
      return null
    })
  }

  return (
    <>
      <div className="flex flex-col w-[100vw] mx-auto h-screen">
          {question ? (
            <Question data={question} questionAnsweredCb={onBackFromQuestion}/>
          ) : (
            <div className="flex flex-col mx-auto mt-2 self-center w-[100vw] h-auto">
              <Heading className="font-blenny text-6xl text-shadow">
                back to <br/> summer
              </Heading>
              <GridGame questions={trivia} playCb={onPlayQuestion}/>
            </div>
          )}
        </div>
    </>
  );
};

export default Game;
