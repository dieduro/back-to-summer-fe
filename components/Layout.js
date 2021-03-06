import {useEffect} from "react";
import { useRouter } from "next/router";
import UserMenu from "../components/UserMenu";
import Footer from "../components/Footer";
import { useAuth } from "../lib/auth";

const Layout = ({ children }) => {
  let localStoredUser
  const { user } = useAuth();
  useEffect(() => {
    localStoredUser = localStorage.getItem('auth')
  }, [user]);
   
  const logged = user || localStoredUser;

  const router = useRouter()
  const isPlaying = router.pathname == '/trivia' || router.pathname == '/trivia/[qid]'
  return (
    <div className="flex relative">
      <div className="absolute filter grayscale bg-sea bg-cover opacity-20 w-full h-full"></div>
      <div className="absolute w-screen gradient-background-60 h-full">
      </div>  
      <div className="flex flex-col justify-between relative z-10 mx-auto min-h-screen">
        <div className="flex items-center justify-end pt-4 px-4 h-12">
          {logged && !isPlaying && <UserMenu />}
        </div>
        <main className="w-[100vw] h-auto">
          {children}
        </main>
      <Footer />
      </div>
    </div>
  );
};

export default Layout;