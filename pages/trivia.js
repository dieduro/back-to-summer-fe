import React, {useEffect} from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth.js";
import Home from "../components/Home";
import { Circles } from "@agney/react-loading";
import { getTrivia } from "../lib/db";
import theme from "../theme.json";

export default function Trivia({ trivia }) {
    const { user } = useAuth();
    const router   = useRouter();
    const colors   = theme.colors;   

    // useEffect(() => {
    //   const localStoredUser = localStorage.getItem('auth')

    //   if (!localStoredUser) {
    //     router.push("/");
    //   }
    // }, [user]);
    // if (user) {return <Home trivia={trivia} />}
    // else {
    //   return ( 
    //     <div className="content-center mx-auto w-auto mt-28">
    //       <Circles width="110" height="120" color={colors.primary} />
    //     </div>)
    // }
    return <Home trivia={trivia}/>
}

export async function getStaticProps(context) {
  const trivia = await getTrivia();
  return {
    props: { trivia },
    revalidate: 10
  };
}
