import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useAuth } from "../lib/auth.js";
import { updateUser } from "../lib/db";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Question from "./Question.js";
import GridGame from "./GridGame.js"

const Home = ({ trivia }) => {

  const [gameState, setGameState] = useState("pre-game");
  const [question, setQuestion] = useState(null);
  const [homeContent, setHomeContent] = useState(null);
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
      if (gameState != "play" && trivia && trivia.questions.length > 0) {
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

  useEffect(() => {
    setHomeContent(content);
  }, []);

  const startTrivia = () => {
    setGameState("play");
  };

  const resetUser = async () => {
    await updateUser(user.uid, {
      status: "",
      score: "",
    });
    Router.reload(window.location.pathname);
  };
  
  const onPlayQuestion = (data) => {
    setQuestion(data)
  }
  const onBack = (answered) => {
    console.log("onBack!! ", answered)
    if (!answered) {
      alert("No contestaste la pregunta!")
    } else {
      setQuestion(null)
    }
  }

  return (
    <>
      <div className="flex flex-col w-[100vw] mx-auto h-screen bg-alternate">
          {question ? (
            <Question data={question} onBackCb={onBack} />
          ) : (
            <div className="flex flex-col mx-auto mt-4 self-center w-[100vw] h-auto">
              <Heading color="primary" className="text-shadow">
                BACK TO SUMMER{/* {homeContent?.title} */}
              </Heading>
              <GridGame questions={trivia?.questions} playCb={onPlayQuestion}/>
              
              {/* <div className="mx-auto my-16">
                {homeContent?.buttonText ? (
                  <>
                  3
                  <Button onClick={homeContent?.buttonCb}>
                    {homeContent?.buttonText}
                  </Button>
                  </>
                ) : (
                  <Heading type="h3">
                    {" "}
                    Ya estaremos creando algunas preguntas para vos
                  </Heading>
                )}
              </div> */}
            </div>
          )}
        </div>
    </>
  );
};

export default Home;
