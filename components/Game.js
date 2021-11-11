import GridGame from "./GridGame.js"

const Game = ({ trivia }) => {  
  
  return (
    <div className="flex flex-col w-[100vw] mx-auto">
      <div className="flex flex-col mx-auto mt-2 self-center w-[100vw] h-auto">
        <div className="relative h-auto">
          <h1 className="w-64 mx-auto p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
            back to summer
          </h1>
      </div>
        <GridGame questions={trivia}/>
      </div>
    </div>
  );
};

export default Game;
