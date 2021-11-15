import React from "react";
import { addQuestions, getTrivia } from "../lib/db";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import QuestionsForm from "./QuestionsForm";

const registerUsers = async () => {
  await fetch('/api/process-users-sheet').then(res => {console.log(res)})
}

const deleteUsers = async () => {
  await fetch('/api/delete-users').then(res => {console.log(res)})
}

const getTriviaTest = async () => {
  const culi = await getTrivia()
  console.log(33, culi)
}

const fixQuestionPoints = async () => {
  let questions
  await fetch('/api/getMediumQuestions')
  .then(res => (res.json()))
  .then(data => { questions = data})

  let ids = []
  console.log("Total questions: ", questions.length)
  questions.map(question => {
    if (question.difficulty === 'MEDIA') {
      question.points = 400
      ids.push(question.docId)
    }
  })

    console.log(questions)
    await addQuestions(ids, questions)
  }

const CreateTrivia = ({ questions }) => {
  return (
    <div className="bg-white">
      <div className="my-4">
        <Heading type="h1" color="dark">
          Crear Trivia
        </Heading>
      </div>
      <QuestionsForm questions={questions} />
      {
        process.env.NODE_ENV === 'development' &&
        <div className="flex flex-col justify-between h-60">
          <Button onClick={e => registerUsers()}>Registrar test users</Button>
          <Button onClick={e => deleteUsers()}>Borrar test users</Button>
          <Button onClick={e => getTriviaTest()}>Get Trivia Test</Button>
        </div>
      }
      
    </div>
  );
};

export default CreateTrivia;
