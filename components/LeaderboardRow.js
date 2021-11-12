import Image from "next/image";

const LeaderboardRow = ({ user }) => {
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <p className="text-secondary">{user.name} - {user.company}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-secondary text-center">{user.score}</td>
    </tr>
  );
};

export default LeaderboardRow;
