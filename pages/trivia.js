import React, {useEffect} from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth.js";
import Game from "../components/Game";
import Login from "../components/Login";
import { getTrivia } from "../lib/db";

export default function Trivia({ trivia }) {
    const { user } = useAuth();
    const router   = useRouter();  

  useEffect(() => {
      const localStoredUser = localStorage.getItem('auth')
      if (!localStoredUser) {
        router.push("/");
      }
  }, [user]);

    // if (user) {return <Game trivia={trivia} />}
    // else { return <Login /> }
    return <Game trivia={trivia} />
}

export async function getStaticProps(context) {
  const trivia = await getTrivia();
  return {
    props: trivia,
    revalidate: 10
  };
}
