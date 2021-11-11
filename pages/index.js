import React, {useEffect} from "react";
import { useAuth } from "../lib/auth.js";
import Home from "../components/Home";
import { Circles } from "@agney/react-loading";
import theme from "../theme.json";

export default function Index() {

  const { user } = useAuth();
  const colors = theme.colors;

  useEffect(() => {
    const user = localStorage.getItem("auth")
  }, [user])

  if (user == null) {
    return (
      <div className="content-center mx-auto w-28 mt-28">
        <Circles width="110" height="120" color={colors.white} />
      </div>
    );
  } 
  return <Home />
}
