import { useState, useEffect} from "react";
import { useAuth } from "../lib/auth.js";
import { getUserData } from "../lib/db";
import Home from "../components/Home";
import { Circles } from "@agney/react-loading";
import theme from "../theme.json";

export default function Index() {
  const [ userData, setUserData ] = useState(null);
  const { user } = useAuth();
  const colors = theme.colors;

  useEffect(async () => {
    const localUser = localStorage.getItem("auth")
    if (user != null) {
      const data = await getUserData(user.uid);
      setUserData(data)
    }
  }, [user])


  if (user == null) {
    return (
      <div className="content-center mx-auto w-28 mt-28">
        <Circles width="110" height="120" color={colors.white} />
      </div>
    );
  } 
  return <Home user={userData}/>
}
