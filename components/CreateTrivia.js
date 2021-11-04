import React from "react";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import QuestionsForm from "./QuestionsForm";

const registerUsers = async () => {
  await fetch('/api/process-users-sheet').then(res => {console.log(res)})
}

const deleteUsers = async () => {
  await fetch('/api/delete-users').then(res => {console.log(res)})
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
      <Button onClick={e => registerUsers()}>Registrar test users</Button>
      <Button onClick={e => deleteUsers()}>Borrar test users</Button>
    </div>
  );
};

export default CreateTrivia;
