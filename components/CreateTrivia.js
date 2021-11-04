import React from "react";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import QuestionsForm from "./QuestionsForm";

const dev = process.env.NODE_ENV === 'development';
const BASE_URL = dev ? 'http://localhost:3000' : 'https://back-to-summer.vercel.app';
console.log("env: ", process.env.NODE_ENV);
console.log("BASE_URL: ", BASE_URL);

const registerUsers = async () => {
  await fetch(`${BASE_URL}/api/process-users-sheet`).then(res => {console.log(res)})
}

const deleteUsers = async () => {
  await fetch(`${BASE_URL}/api/delete-users`).then(res => {console.log(res)})
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
