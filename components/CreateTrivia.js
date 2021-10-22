import React from "react";
import Heading from "../ui/Heading";
import QuestionsForm from "./QuestionsForm";

const CreateTrivia = ({ questions }) => {
  return (
    <div className="bg-white">
      <div className="my-4">
        <Heading type="h1" color="dark">
          Crear Trivia
        </Heading>
      </div>
      <QuestionsForm questions={questions} />
    </div>
  );
};

export default CreateTrivia;
