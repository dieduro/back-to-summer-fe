import React, {useState, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTriviaContext } from '../../contexts/TriviaContext';
import { useAuth } from "../../lib/auth";
import Button from '../../ui/Button'
import Game from "../../components/Game";
import { getTrivia, setActivteTriviaToUser, getUserData } from "../../lib/db";
import { playNewTrivia } from "../../utils/helpers";
import { Circles } from "@agney/react-loading";
import theme from "../../theme.json";

export default function Trivia() {
  const [ loading, setLoading ] = useState(true);
  const [ userData, setUserData ] = useState(null);
  const { user } = useAuth();
  const { triviaContext, setTriviaContext } = useTriviaContext();
  const router = useRouter()

  const colors = theme.colors;

  setTimeout(() => {
    setLoading(false);
  }, 800);

  useEffect(async () => {

    if (user == false) {
      router.push('/')
      return
    } else if (user != null) {
      const data = await getUserData(user.uid);
      setUserData(data)
    }

    if (!triviaContext && user) {
      const data = await getTrivia(user)

      if (!data.error && !user.hasActiveTrivia && (!user.trivia || user.trivia == '')) {
        const triviaJson = JSON.stringify(data)
        const userData = {trivia: triviaJson, hasActiveTrivia: true}
        setActivteTriviaToUser(user.uid, userData )
      }

        setTriviaContext(data)
      }
  }, [user])

  const onResetTrivia = async () => {
    await playNewTrivia(user)
    setTriviaContext(null)
    router.push('/')
  }

  if (loading) {
    return (
      <div className="w-3/4 mx-auto">
        <h1 className="font-blenny text-white text-4xl w-full text-center mb-2 mx-auto">Cargando</h1>
        <div className="content-center mx-auto w-28 mt-12"> 
          <Circles width="110" height="120" color={colors.white} />
        </div>
      </div>)
  }

  if (triviaContext?.length > 0) { return <Game trivia={triviaContext} user={userData} resetTriviaCb={onResetTrivia}/> }
  else if (user == false) {
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
