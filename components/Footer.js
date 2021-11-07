
import { useRouter } from "next/router";
import Emoji from "./Emoji";

const Footer = () => {

  const router = useRouter()

  if (router.pathname == '/trivia') {
    return <></>
  } else {
    return (
      <footer className="absolute bottom-0 w-full mx-auto py-4 ">
        <div className="w-max mx-auto">
          <span className="text-gray mr-2">Coded with</span>
          <Emoji symbol="❤️" label="heart" />
          <span className="text-gray ml-2">by DieDuro</span>
        </div>
      </footer>
    );
  } 
};

export default Footer;
