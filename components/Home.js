import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Router from "next/router";
import Image from "next/image"
import { useAuth } from "../lib/auth.js";
import { updateUser } from "../lib/db";
import Login from "../components/Login";
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
        console.log(user)
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
    <div className="flex flex-col justify-around mx-auto my-4 lg:w-2/3 md:w-4/5 max-h-screen">
        <Heading className="font-blenny text-4xl md:text-6xl text-shadow">
          back to <br/> summer
        </Heading>
        {
          user ? 
            <h3 className="font-sans m-4 text-white text-center text-3xl lg:text-4xl">{ `Hola ${user.name}!`}</h3>
            : <Login />
        }
        
        <div className="flex flex-col justify-between w-4/5 lg:w-3/4 h-auto mx-auto my-4">
          <p className="flex flex-col justify-between w-full mx-auto my-4 text-white text-xl lg:text-3xl italic">
            <span className="mx-auto">La playa te reúne,</span>
            <span className="mx-auto">la música te reconecta,</span>
            <span className="mx-auto">las marcas se relacionan</span>
          </p>
          <ul className="flex justify-between my-4">
            <li className="w-16 md:w-28">
              <Image src="/mediakit.png" width={80} height={80} layout="responsive" />
              <h3 className="mt-2 text-center text-white text-xl">Mediakit</h3>
            </li>
            <li className="w-16 md:w-28">
              <Image src="/ranking.png" width={80} height={80} layout="responsive" />
              <h3 className="mt-2 text-center text-white text-xl">Ranking</h3>
            </li>
            <li className="w-16 md:w-28">
              <Image src="/reglas.png" width={80} height={80} layout="responsive" />
              <h3 className="mt-2 text-center text-white text-xl">Reglas</h3>
            </li>
          </ul>
          { user &&
          <div className="relative flex justify-center mt-8"> 
            <Button>
              <Link href="/trivia">
                Jugar
              </Link>
            </Button>
            </div>
          }
        </div>
      </div>
  );
};

export default Home;
