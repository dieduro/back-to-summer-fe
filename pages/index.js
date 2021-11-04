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
  console.log(88, user)

  useEffect(() => {
    const user = localStorage.getItem("auth")
  }, [user])

  if (user == null) {
    return (
      <div className="content-center mx-auto w-auto mt-28">
        <Circles width="110" height="120" color={colors.white} />
      </div>
    );
  } 
  else if (user) { 
    return <Home trivia={trivia} />
  }
  else {
    return <Login />;
  }
}

export async function getServerSideProps(context) {
  const trivia = await getTrivia();
  return {
    props: trivia,
  };
}
