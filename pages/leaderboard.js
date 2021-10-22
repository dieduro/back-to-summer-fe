import React from "react";
import Link from "next/link";
import { getLeaderboard } from "../lib/db";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import LeaderboardRow from "../components/LeaderboardRow";

export default function Leaderboard({ data }) {
  const users = data.users;

  return (
    <div className="mx-auto w-4/5 h-full bg-primary">
      <div className="flex justify-center content-center py-4 w-1/2 mx-auto my-0">
        <Heading className="font-semibold">LEADERBOARD</Heading>
      </div>
      <div className="flex items-center w-full lg:px-4 py-4">
        <div className="overflow-x-auto w-full">
          <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-left">
                <th className="font-semibold text-sm text-secondary uppercase px-6 py-4">
                  nombre
                </th>
                {/* <th className="font-semibold text-sm uppercase px-6 py-4">
                  e-mail
                </th> */}
                {/* <th className="font-semibold text-sm uppercase px-6 py-4 text-center">
                  status
                </th> */}
                <th className="font-semibold text-sm text-secondary uppercase px-6 py-4 text-center">
                  score
                </th>
                <th className="font-semibold text-sm uppercase px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <LeaderboardRow key={user.uid} user={user} />
              ))}
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
