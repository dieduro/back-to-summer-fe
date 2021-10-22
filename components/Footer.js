
import { useRouter } from "next/router";
import Emoji from "./Emoji";

const Footer = () => {

  const router = useRouter()

  if (router.pathname == '/trivia') {
    return <></>
  } else {
    return (
      <footer className="w-full absolut bottom-0 mx-auto py-4 h-[7vh] ">
        <div className="w-max mx-auto">
          <span className="text-secondary mr-2">Coded with</span>
          <Emoji symbol="❤️" label="heart" />
          <span className="text-secondary ml-2">by DieDuro</span>
        </div>
      </footer>
    );
  } 
};

export default Footer;
