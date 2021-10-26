import React from "react";
import CreateTrivia from "../components/CreateTrivia";
import { getQuestions } from "../lib/db";

const AdminPanel = ({ trivia }) => {
  const questions = trivia?.questions || [];

  return <CreateTrivia questions={questions} />
};

export default AdminPanel;

export async function getServerSideProps(context) {
  const trivia = await getQuestions();
  return {
    props: { trivia },
  };
}
