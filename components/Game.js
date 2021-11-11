import React, { useState, useEffect } from "react";
import { useTriviaContext } from '../contexts/TriviaContext';
import Question from "./Question.js";
import GridGame from "./GridGame.js"

const DIFFICULTIES = {
  'BAJA' : 0,
  'MEDIA': 1,
  'ALTA' : 2
}

const CATEGORIES = {
  'playa' : 0,
  'musica': 1,
  'marcas': 2
}

const Game = ({ trivia }) => {  
  
  const { triviaContext, setTriviaContext } = useTriviaContext();
  const [question, setQuestion] = useState(null);
  

   useEffect(() => {
    if (!triviaContext) {
      setTriviaContext(trivia)
    }
   }, [trivia]);

  return (
    <div className="flex flex-col w-[100vw] mx-auto">
      <div className="flex flex-col mx-auto mt-2 self-center w-[100vw] h-auto">
        <div className="relative h-auto">
          <h1 className="w-64 mx-auto p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
            back to summer
          </h1>
      </div>
        <GridGame questions={triviaContext}/>
      </div>
    </div>
  );
};

export default Game;
