
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "./UserMenu";

import { useAuth } from "../lib/auth";

const Header = () => {

  const { user } = useAuth();
  const router = useRouter()

  if (router.pathname == '/trivia') {
    return <></>
  } else {
    return (
        <header className="flex justify-between lg:w-4/5 w-full mx-auto h-[10vh]">
          <div className="container mx-4 h-12 w-28 lg:w-40 p-2 mt-2">
          {/* { !user &&
            <Link href="/">
                <Image
                  width={80}
                  height={27}
                  src="/logo.png"
                  layout="responsive"
                  alt="Logo"
                />
            </Link>
          } */}
          </div>
          <div className="flex items-center">{user && <UserMenu />}</div>
        </header>
    );
  } 
};

export default Header;
