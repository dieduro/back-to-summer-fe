const LeaderboardRow = ({ player, index, isCurrentUser }) => {
  const { name, company, score, bestScore, timeUsed } = player;
  const rowStyle = isCurrentUser ? 'bg-red bg-opacity-75' : ''
  return (
    <tr className={rowStyle}>
      <td className="w-8 p-2 text-white font-bold">{index + 1}</td>
      <td className="pl-2 py-2">
        <div className="flex flex-col items-left">
          <p className="text-white text-sm md:text-xl">{name}</p>
          <p className="text-white text-sm md:text-xl">{company}</p>
        </div>
      </td>
      <td className="p-2 text-white text-center">{bestScore >= score ? bestScore : score}</td>
      <td className="p-2 text-white text-center">{timeUsed}</td>
    </tr>
  );
};

export default LeaderboardRow;
