
import QuestionBox from "./QuestionBox.js"

const GridGame = ({questions, playCb}) => {

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (questions[i][j] == null){
                questions[i][j] = {id: `emp${i}`, questions: null}
            }
        }
    }
    return (
        <div className="flex  mx-auto">
            <div className="grid grid-rows-3 gap-2 h-full w-12 mr-2 pt-14">
                <div className="bg-green-400 w-12 h-20 sm:h-40 lg:h-48">
                    <span>Fácil</span>
                </div>
                <div className="bg-green-400 w-12 h-20 sm:h-40 lg:h-48">
                    <span>Intermedio</span>
                </div>
                <div className="bg-green-400 w-12 h-20 sm:h-40 lg:h-48">
                    <span className="text-dark">Difícil</span>
                </div>
            </div>
            <div className="h-full w-[18rem] sm:w-[32rem] lg:w-[38rem]">
            <div className="grid grid-cols-3 gap-2 w-full h-12 ">
                <div className="bg-yellow-400">
                    <span className="text-dark">Categoria #1</span>
                </div>
                <div className="bg-yellow-400">
                    <span className="text-dark">Categoria #2</span>
                </div>
                <div className="bg-yellow-400">
                    <span className="text-dark">Categoria #3</span>
                </div>
            </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                    <QuestionBox key={questions[0][0].id} data={questions[0][0]} onClickCb={playCb}/>
                    <QuestionBox key={questions[0][1].id} data={questions[0][1]} onClickCb={playCb}/>
                    <QuestionBox key={questions[0][2].id} data={questions[0][2]} onClickCb={playCb}/>
                    <QuestionBox key={questions[1][0].id} data={questions[1][0]} onClickCb={playCb}/>
                    <QuestionBox key={questions[1][1].id} data={questions[1][1]} onClickCb={playCb}/>
                    <QuestionBox key={questions[1][2].id} data={questions[1][2]} onClickCb={playCb}/>
                    <QuestionBox key={questions[2][0].id} data={questions[2][0]} onClickCb={playCb}/>
                    <QuestionBox key={questions[2][1].id} data={questions[2][1]} onClickCb={playCb}/>
                    <QuestionBox key={questions[2][2].id} data={questions[2][2]} onClickCb={playCb}/>
                </div>
            </div>
        </div>
    )
}

export default GridGame