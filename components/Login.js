import { useState } from "react";
import SignIn from "../components/SignIn";
import Heading from "../ui/Heading.js";

export default function Login() {
  const [state, setState] = useState({ type: "LOGIN", params: {} });

  const titleEnum = {
    LOGIN: "BIENVENIDO",
    SIGNIN: "INICIÁ SESIÓN"
  };

  const setDefaultState = () => {
    setState({ type: "LOGIN" });
  };

  return (
    <div className="flex flex-grow items-center h-full">
      <div className="w-[100vw] lg:w-[100vw] md:w-[75vw] max-w-5xl h-full lg:h-auto md:ring-primary md:ring-2 px-2 pt-8 bg-dark md:rounded-xl shadow mx-auto">
        <Heading color="primary">{titleEnum[state.type]}</Heading>
        {state.type == "LOGIN" && (
          <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto my-4 lg:my-12 text-center">
            <SignIn />
          </div>
        )}
        {state.type != "LOGIN" && (
          <button className="" onClick={setDefaultState}>
            Volver{" "}
          </button>
        )}
      </div>
    </div>
  );
}
