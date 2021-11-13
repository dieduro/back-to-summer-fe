const LeaderboardRow = ({ player, index, isCurrentUser }) => {
  const { name, company, score, timeUsed } = player;
  const rowStyle = isCurrentUser ? 'bg-red bg-opacity-75' : ''
  return (
    <tr className={rowStyle}>
      <td className="w-8 pl-2 py-2 text-white font-bold">{index + 1}</td>
      <td className="pl-4 py-2">
        <div className="flex flex-col items-left space-x-3">
          <p className="text-white">{name}</p>
          <p className="text-white">{company}</p>
        </div>
      </td>
      <td className="pl-4 py-2 text-white text-center">{score}</td>
      <td className="pl-4 py-2 text-white text-center">{timeUsed}</td>
    </tr>
  );
};

export default LeaderboardRow;
