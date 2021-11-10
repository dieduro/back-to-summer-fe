import React, {useEffect} from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/auth";
import Game from "../../components/Game";
import { getTrivia } from "../../lib/db";

export default function Trivia({ trivia }) {
  const { user } = useAuth();
  const router   = useRouter();  
  useEffect(() => {
      const localStoredUser = localStorage.getItem('auth')
      if (!localStoredUser || user) {
        router.push("/");
      }
  }, [])
  
  if (user) { <Game trivia={trivia} /> }
  return <></>
}

export async function getStaticProps(context) {
  const {trivia} = await getTrivia();
  return {
    props: {trivia: trivia},
    revalidate: 10
  };
}