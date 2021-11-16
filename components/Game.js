import Link from 'next/link';
import { setBestScore } from '../lib/db';
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

const Game = ({ trivia, user, resetTriviaCb }) => {  
  if (!user) return null

  if (user.currentResponses == 9 && (user.score > user.bestScore || user.roundsPlayed == 1)) {
    setBestScore(user.uid, user.score)
  }

  return (
    <div className="flex flex-col w-[100vw] mx-auto">
      <div className="flex flex-col mx-auto mt-2 self-center w-[100vw] h-auto">
        <div className="relative h-auto mt-4">
          <h1 className="w-64 mx-auto p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
            back to summer
          </h1>
        </div>
        {
          user.currentResponses == 9 ?
          <div className="flex flex-col justify-between w-1/2 mx-auto">
            <h3 className="text-white text-2xl font-helvetica text-center">¡Felicitaciones!</h3>
            {
              user.bestScore >= user.score ?
                <>
                  <p className="text-white text-2xl font-helvetica text-center">Tu puntaje final en esta trivia fue: {user.score} </p>
                  <p className="text-white text-2xl font-helvetica text-center">Tu intento anterior fue mejor! Vamos a conservar ese 😃 </p>
                  <Score value={user.bestScore}/>
                </>
              : 
                <>
                  <p className="text-white text-2xl font-helvetica text-center">Tu puntaje final fue: </p>
                  <Score value={user.score}/>
                </>

            }
            
            <Link href="/leaderboard"><Button>Ranking</Button></Link>
            { user.roundsPlayed < 2 &&
              <Button onClick={resetTriviaCb}>Jugar una nueva trivia</Button>
            }
          </div>
          :
          <>
            <GridGame questions={trivia}/>
            {
              user.currentResponses > 0 &&
              <Score value={user.score} />
            }
          </>
        }
      </div>
    </div>
  );
};

export default Game;
