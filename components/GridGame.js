
import QuestionBox from "./QuestionBox.js"

const GridGame = ({questions}) => {
    if (!questions) return null

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (questions[i][j] == null){
                const id = i +'-'+ j
                questions[i][j] = {id: `emp${id}`, questions: null}
            }
        }
    }
    return (
        <div className="flex mx-auto">
            <div className="h-full w-[18rem] sm:w-[28rem] lg:w-[32rem]">
            <div className="grid grid-cols-3 gap-2 w-full h-12 ">
                <div className="flex justify-center items-center mr-4">
                    <span className="text-white font-semibold font-helvetica text-md sm:text-2xl">PLAYA</span>
                </div>
                <div className="flex justify-center items-center mr-4">
                    <span className="text-white font-semibold font-helvetica text-md sm:text-2xl">MÚSICA</span>
                </div>
                <div className="flex justify-center items-center mr-4">
                    <span className="text-white font-semibold font-helvetica text-md sm:text-2xl">MARCAS</span>
                </div>
            </div>
                <div className="grid grid-cols-3 gap-2">
                    <QuestionBox key={questions[0][0].id} data={questions[0][0]} />
                    <QuestionBox key={questions[0][1].id} data={questions[0][1]} />
                    <QuestionBox key={questions[0][2].id} data={questions[0][2]} />
                    <QuestionBox key={questions[1][0].id} data={questions[1][0]} />
                    <QuestionBox key={questions[1][1].id} data={questions[1][1]} />
                    <QuestionBox key={questions[1][2].id} data={questions[1][2]} />
                    <QuestionBox key={questions[2][0].id} data={questions[2][0]} />
                    <QuestionBox key={questions[2][1].id} data={questions[2][1]} />
                    <QuestionBox key={questions[2][2].id} data={questions[2][2]} />
                </div>
            </div>
        </div>
    )
}

export default GridGame