import { useState, useEffect } from "react";
import { getUserData } from "../lib/db"
import { useAuth } from "../lib/auth.js";
import GridGame from "./GridGame.js"

const Game = ({ trivia }) => {  
  const [userData, setUserData] = useState({})
  
  const { user } = useAuth();
  useEffect(async () => {
    const data = await getUserData(user.uid);
    console.log(222, data)
    setUserData(data)
  }, [])
  return (
    <div className="flex flex-col w-[100vw] mx-auto">
      <div className="flex flex-col mx-auto mt-2 self-center w-[100vw] h-auto">
        <div className="relative h-auto mt-4">
          <h1 className="w-64 mx-auto p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
            back to summer
          </h1>
        </div>
        <GridGame questions={trivia}/>
        {
          userData?.score &&
          <span className="inline-flex items-center justify-center
          min-w-40 max-h-12 mx-auto my-4 px-6 py-2 rounded-3xl
          bg-white
          text-primary font-helvetica font-medium text-2xl
          disabled:opacity-50 focus:outline-none focus:ring">{userData.score}</span>
        }
      </div>
    </div>
  );
};

export default Game;
