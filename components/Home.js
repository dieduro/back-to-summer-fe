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
    <div className="flex flex-col justify-around mx-auto mt-8 lg:w-2/3 md:w-4/5 max-h-screen">
        
        { user && 
            <h3 className="font-helvetica m-4 text-white text-center text-3xl lg:text-4xl font-medium">{ `Hola ${user.name}!`}</h3>
        }
        <div className="relative h-auto">
          <h1 className="w-64 mx-auto mt-8 p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
            back to summer
          </h1>
        </div>

        { !user && <Login /> }
        
        <div className="flex flex-col justify-between w-4/5 lg:w-3/4 xl:w-3/5 mx-auto">
          <p className="flex flex-col justify-between w-full mx-auto my-6 text-white text-2xl lg:text-3xl font-helvetica italic">
            <span className="mx-auto">La playa te reúne,</span>
            <span className="mx-auto">la música te reconecta,</span>
            <span className="mx-auto">las marcas se relacionan</span>
          </p>
          <ul className="flex flex-col sm:flex-row justify-between my-6">
            <li className="w-full">
              <div className="flex justify-center items-center bg-orange w-24 h-24 mx-auto mb-2 rounded-xl shadow">
                <Image src="/mediakit.png" width={80} height={80} />
              </div>
              <h3 className="mb-4 mx-auto text-center text-white text-xl font-helvetica">Mediakit</h3>
            </li>
            <li className="w-full">
              <div className="flex justify-center items-center bg-orange w-24 h-24 mb-2 mx-auto rounded-xl shadow">
                <Image src="/ranking.png" width={80} height={80} />
              </div>
              <h3 className="mb-4 mx-auto h-auto text-center text-white text-xl font-helvetica">Ranking</h3>
            </li>
            <li className="w-full">
              <div className="flex justify-center items-center bg-orange mx-auto w-24 h-24 mb-2 rounded-xl shadow">
                <Image src="/reglas.png" width={60} height={60} />
              </div>
              <h3 className="mb-4 mx-auto text-center text-white text-xl font-helvetica">Reglas</h3>
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
