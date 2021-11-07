import React from "react";
import UserMenu from "../components/UserMenu";
import Footer from "../components/Footer";
import { useAuth } from "../lib/auth";

const Layout = ({ children }) => {
  
  const { user } = useAuth();

  return (
    <div className="flex">
      <div className="absolute filter grayscale bg-sea bg-cover opacity-20 w-full h-screen"></div>
      <div className="absolute w-screen gradient-background h-full">
      </div>  
        <div className="z-10 mx-auto min-h-screen h-full overflow-y-auto">
          {user && <div className="flex items-center justify-end p-4"><UserMenu /></div> }
          <main className="w-[100vw] h-auto">
            {children}
          </main>
          {/* <Footer /> */}
        </div>
      
    </div>
  );
};

export default Layout;