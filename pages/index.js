import React, {useEffect} from "react";
import theme from "../theme.json";

import { Circles } from "@agney/react-loading";
import Home from "../components/Home";
import Login from "../components/Login";
import { useAuth } from "../lib/auth.js";
import { getTrivia } from "../lib/db";

export default function Index({ trivia }) {

  const { user } = useAuth();
  const colors = theme.colors;

  useEffect(() => {
    const user = localStorage.getItem("auth")
  }, [user])

  if (user == null) {
    return (
      <div className="content-center mx-auto w-28 mt-28">
        <Circles width="110" height="120" color={colors.white} />
      </div>
    );
  } 
  return <Home trivia={trivia} />
}

export async function getServerSideProps(context) {
  const trivia = await getTrivia();
  return {
    props: trivia,
  };
}
