import React, {useState, useEffect} from "react";
import Link from "next/link";
import { getLeaderboard } from "../lib/db";
import { useAuth } from "../lib/auth.js";
import Button from "../ui/Button";
import LeaderboardRow from "../components/LeaderboardRow";

export default function Leaderboard({ data }) {

  const topTenList = data.users.slice(0, 10)
  const playersList = [] 
  topTenList.map((user, index) => {
    user.pos = index + 1
    playersList.push(user)
  })

  const [leaderboard, setLeaderboard] = useState(playersList);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const userIndex = leaderboard.findIndex(
        (player) => player.uid === user.uid
      );
      if (userIndex == -1) {
  
        for (let i = 0; i < data.users.length; i++) {
          const element = data.users[i];
          if (element.uid === user.uid) {
            element.pos = i
            setLeaderboard([...leaderboard, element])
            break
          }
        }
      }
    } else if (user == false && leaderboard.length == 11) {
      setLeaderboard(leaderboard.slice(0,10))
    }
  }, [user])
  


  return (
    <div className="mx-auto w-11/12 sm:w-4/5 h-full">
      
      <Link href='/'><Button>⬅</Button></Link>
      <div className="relative h-auto">
          <h1 className="w-64 mx-auto mt-8 p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
            back to summer
          </h1>
          <h3 className="w-64 mx-auto mt-4 p-2 text-white text-4xl text-center align-middle font-helvetica" >Ranking</h3>
        </div>
      <div className="flex items-center w-full md:w-3/4 mx-auto lg:px-4 py-4 ">
        <div className="overflow-x-auto w-full">
        { !leaderboard || leaderboard.length === 0 ?
          <div className="w-3/4 mx-auto">
            <h3 className="text-white text-xl font-helvetica text-center">No hay registros para mostrar en este momento.</h3>
          </div>
          :
          <table className="mx-auto max-w-4xl w-full whitespace-pre-wrap rounded-lg divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-left">
              <th className="font-semibold text-xs sm:text-sm text-white uppercase w-8 pl-2 py-2">
                </th>
                <th className="font-semibold text-xs sm:text-sm text-white uppercase pl-4 py-2">
                  Nombre
                </th>
                <th className="font-semibold text-xs sm:text-sm text-white uppercase p-2 py-2 text-center">
                  Score
                </th>
                <th className="text-white font-semibold text-xs sm:text-sm uppercase px-4 py-2 w-14">Tiempo</th>
              </tr>
            </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboard.map((player) => {
                    if (player.roundsPlayed > 0) {
                      let isCurrentUser = false
                      if (user && player.uid === user.uid) { isCurrentUser = true}
                      return <LeaderboardRow key={player.uid} player={player} isCurrentUser={isCurrentUser} />
                    } else {
                      return null
                    }
                  })}
                </tbody>
          </table>
          }
        </div>
      </div>
      <div className="flex items-center w-full lg:px-4 py-4">
        <Button>
          <Link href="/">Volver al Inicio</Link>
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await getLeaderboard();
  if (data.error) {
    return { props: { data: [] } };
  }
  return {
    props: { data },
  };
}
