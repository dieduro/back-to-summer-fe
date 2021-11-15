import React from "react";
import Link from "next/link";
import { getLeaderboard } from "../lib/db";
import { useAuth } from "../lib/auth.js";
import Button from "../ui/Button";
import LeaderboardRow from "../components/LeaderboardRow";

export default function Leaderboard({ data }) {
  const players = data.users;
  const { user } = useAuth();

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
              {players.map((player,i) => {
                let isCurrentUser = false
                if (user && player.uid === user.uid) { isCurrentUser = true}
                return <LeaderboardRow key={player.uid} player={player} index={i} isCurrentUser={isCurrentUser} />
              })}
            </tbody>
          </table>
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
  return {
    props: { data },
  };
}
