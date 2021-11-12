import Link from 'next/link'
import Image from "next/image"
import { playNewTrivia } from '../utils/helpers';
import Login from "../components/Login";
import Button from "../ui/Button";
import router from 'next/router';

const Home = ({user}) => {

  const onResetTrivia = async () => {
    await playNewTrivia(user)
    router.reload()
  }
  return (
    <div className="flex flex-col justify-around mx-auto lg:w-2/3 md:w-4/5">
        
        { user && 
            <h3 className="font-helvetica m-4 text-white text-center text-3xl lg:text-4xl font-medium">{ `Hola ${user.name}!`}</h3>
        }
        <div className="relative h-auto">
          <h1 className="w-64 mx-auto mt-8 p-2 text-white text-6xl text-center align-middle font-blenny leading-[0.6]">
            back to summer
          </h1>
        </div>

        { !user && <Login /> }
        
        <div className="flex flex-col justify-between w-4/5 lg:w-3/4 xl:w-3/5 mx-auto">
          <p className="flex flex-col justify-between w-full mx-auto my-6 text-white text-2xl lg:text-3xl font-helvetica italic">
            <span className="mx-auto">La playa te reúne,</span>
            <span className="mx-auto">la música te reconecta,</span>
            <span className="mx-auto">las marcas se relacionan</span>
          </p>
          <ul className="flex flex-col sm:flex-row justify-between w-3/4 my-2 mx-auto">
            <a href="https://mediamaxargentina.com/downloads/mediamax_verano2022.pdf" target="_blank" rel="noopener noreferrer" download>
              <li className="w-auto">
                <div className="flex justify-center items-center bg-orange w-20 h-20 mx-auto mb-2 rounded-xl shadow">
                  <Image src="/mediakit.png" width={50} height={50} />
                </div>
                <h3 className="mb-4 mx-auto text-center text-white text-xl font-helvetica">Mediakit</h3>
              </li>
            </a>
            <Link href="/leaderboard">
              <li className="w-auto cursor-pointer">
                <div className="flex justify-center items-center bg-orange w-20 h-20 mb-2 mx-auto rounded-xl shadow">
                  <Image src="/ranking.png" width={50} height={50} />
                </div>
                <h3 className="mb-4 mx-auto h-auto text-center text-white text-xl font-helvetica">Ranking</h3>
              </li>
            </Link>
              <Link href="/rules">
                <li className="w-auto cursor-pointer">
                    <div className="flex justify-center items-center bg-orange mx-auto w-20 h-20 mb-2 rounded-xl shadow">
                      <Image src="/reglas.png" width={50} height={50} />
                    </div>
                    <h3 className="mb-4 mx-auto text-center text-white text-xl font-helvetica">Reglas</h3>
                </li>
              </Link>
          </ul>
          { user &&
          <div className="relative flex flex-col justify-center mt-2 mb-6"> 
            {
              user.currentResponses > 0 ?
              <div className="flex flex-col justify-between">
                <h3 className="mb-4 mx-auto text-center text-white text-xl font-helvetica font-semibold">
                Respondiste <span className="font-bold text-red">{user.currentResponses}</span>/9 preguntas</h3>
                { user.roundsPlayed < 2 ? 
                  <Button onClick={onResetTrivia}>
                    Jugar una nueva trivia
                  </Button>
                  : <h3 className="mb-4 mx-auto text-center text-white text-xl font-helvetica">No te quedan trivias por jugar.</h3>
                }
              </div>
              : 
              <Button>
                <Link href="/trivia">
                  Jugar
                </Link>
              </Button>
            }
            </div>
          }
        </div>
      </div>
  );
};

export default Home;
