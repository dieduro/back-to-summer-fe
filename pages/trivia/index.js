import React, {useEffect} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../../lib/auth";
import Button from '../../ui/Button'
import Game from "../../components/Game";
import { getTrivia } from "../../lib/db";

export default function Trivia({ trivia }) {
  const { user } = useAuth();
  const router   = useRouter(); 
  
  if (user) { return <Game trivia={trivia} /> }
  return ( 
    <div className="content-center mx-auto w-80 mt-28">
      <h1 className="font-helvetica text-white text-4xl">Por favor iniciá sesión para jugar</h1>
      <Link href='/'><Button>Ir al Inicio</Button></Link>
    </div>)
}

export async function getStaticProps(context) {
  const {trivia} = await getTrivia();
  return {
    props: {trivia: trivia},
    revalidate: 10
  };
}
