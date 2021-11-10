import SignIn from "../components/SignIn";
import Heading from "../ui/Heading.js";

export default function Login() {

  return (
      <div className="flex flex-col justify-center items-center w-[100vw] lg:w-3/5 md:w-3/5 max-w-5xl h-60 lg:h-auto p-2 mt-2 mx-auto">
        {/* <Heading className="text-xl md:text-3xl" color="white">Iniciá sesión</Heading> */}
        <div className="w-3/4">
          <SignIn />
        </div>
      </div>
  );
}
