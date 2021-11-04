import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="mx-auto flex flex-col min-h-screen justify-between">
        <div className="absolute flex flex-col justify-between h-full w-screen gradient-background bg-opacity-50">
        </div>
        <div className="z-10">
        <Header />
          <main className="flex flex-col flex-grow h-auto min-h-[300px]">
            {children}
          </main>
        <Footer />
      </div>
      </div>
    </div>
  );
};

export default Layout;