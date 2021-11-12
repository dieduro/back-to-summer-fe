import { useState, useEffect } from "react";
import { getUserData } from "../lib/db"
import { useAuth } from "../lib/auth.js";
import GridGame from "./GridGame.js"
import Button from "../ui/Button"

const Score = ({ value }) => {
  return (
    <span className="inline-flex items-center justify-center
          min-w-40 max-h-12 mx-auto mt-8 px-6 py-2 rounded-3xl
          bg-white
          text-primary font-helvetica font-medium text-2xl
          disabled:opacity-50 focus:outline-none focus:ring">{value}</span>
  )

}

const Game = ({ trivia }) => {  
  const [userData, setUserData] = useState(null)
  
  const { user } = useAuth();
  useEffect(async () => {
    const data = await getUserData(user.uid);
    setUserData(data)
  }, [])

  if (!userData) return null
  return (
    <div className="flex flex-col w-[100vw] mx-auto">
      <div className="flex flex-col mx-auto mt-2 self-center w-[100vw] h-auto">
        <div className="relative h-auto mt-4">
          <h1 className="w-64 mx-auto p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
            back to summer
          </h1>
        </div>
        {
          userData.answeredQuestions.length == 9 ?
          <div className="flex flex-col justify-between w-1/2 mx-auto">
            <h3>¡Felicitaciones!</h3>
            <p>Tu puntaje final fue: </p>
            <Score value={userData.score}/>
            <Button>Jugar una nueva trivia</Button>
          </div>
          :
          <>
            <GridGame questions={trivia}/>
            {
              userData.answeredQuestions.length > 0 &&
              <Score value={userData.score} />
            }
          </>
        }
      </div>
    </div>
  );
};

export default Game;
