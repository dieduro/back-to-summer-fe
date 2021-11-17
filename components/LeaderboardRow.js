import Star from '../icons/Star'

const LeaderboardRow = ({ player, isCurrentUser }) => {
  const { name, company, score, bestScore, timeUsed, pos } = player;
  const rowStyle = isCurrentUser ? 'bg-red bg-opacity-75' : ''
  const starColor = pos == 1 ? '#FFD700' : '#b0b0b0'
  return (
    <tr className={rowStyle}>
      <td className="w-8 p-2 text-white font-bold text-center">
        { pos <= 10 &&
            <Star fillColor={starColor}/> 
        }
        {pos}
      </td>
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
