import React, {useState, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTriviaContext } from '../../contexts/TriviaContext';
import { useAuth } from "../../lib/auth";
import Button from '../../ui/Button'
import Game from "../../components/Game";
import { getTrivia, setActivteTriviaToUser } from "../../lib/db";

export default function Trivia() {
  const { user } = useAuth();
  const { triviaContext, setTriviaContext } = useTriviaContext();
  const router = useRouter()

  //console.log(9090, user)

  useEffect(() => {
    if (user == false) {
      router.push('/')
      return
    }
  }, [user])

  useEffect(async () => {
    console.log(triviaContext)
    if (!triviaContext && user) {
      const data = await getTrivia(user)
      console.log("PULLING TRIVIA from DB")
      console.log("user: ", user)
      if (!user.hasActiveTrivia && (!user.trivia || user.trivia == '')) {
        const triviaJson = JSON.stringify(data)
        const userData = {trivia: triviaJson, hasActiveTrivia: true}
        setActivteTriviaToUser(user.uid, userData )
      }

      setTriviaContext(data)
    }
  }, [user])

  console.log(555, triviaContext)

  if (triviaContext?.length > 0) { return <Game trivia={triviaContext} /> }
  else if (!user) {
    return ( 
      <div className="content-center mx-auto w-80 mt-28">
        <h1 className="font-helvetica text-white text-4xl">Por favor iniciá sesión para jugar</h1>
        <Link href='/'><Button>Ir al Inicio</Button></Link>
      </div>)
  } else {
    return ( 
      <div className="content-center mx-auto w-80 mt-28">
        <h1 className="font-helvetica text-white text-4xl">Lo sentimos! No pudimos encontrar una trivia disponible. Volvé a intentar por favor.</h1>
        <Link href='/'><Button>Ir al Inicio</Button></Link>
      </div>)
  }
}
