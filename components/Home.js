import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Router from "next/router";
import { useAuth } from "../lib/auth.js";
import { updateUser } from "../lib/db";
import Button from "../ui/Button";
import Heading from "../ui/Heading.js";

const Home = ({ trivia}) => {
  const [gameState, setGameState] = useState("pre-game");
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
      if (gameState != "play" && trivia) {
        content = {
          title: `Hola ${user.name}!`,
          buttonText: "Jugar"
        };
      } else if (!trivia) {
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

  return (
    <div className="flex flex-col w-[100vw] mx-auto max-h-screen">
      <div className="mx-auto my-4">
        <Heading className="font-blenny text-6xl text-shadow">
          back to <br/> summer
        </Heading>
        <h3 className="font-sans text-white text-center text-3xl lg:text-4xl">{homeContent?.title}</h3>
        <div className="flex flex-col justify-between w-4/5 md:w-3/5 h-80 mx-auto mt-8">
          <div><p className="text-white text-xl lg:text-2xl">
            La playa te reúne,
            la música te reconecta,
            las marcas se relacionan
          </p></div>
          <ul className="flex justify-between">
            <li>
              <h3 className="text-white">Mediakit</h3>

            </li>
            <li>
            <h3 className="text-white">Ranking</h3>
            </li>
            <li>
            <h3 className="text-white">Reglas</h3>
            </li>
          </ul>
          <Link href="/trivia">
            <Button>
              {homeContent?.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
