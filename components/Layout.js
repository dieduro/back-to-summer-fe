import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="mx-auto flex flex-col min-h-screen justify-between bg-white">
        <Header />
        <main className="flex flex-col flex-grow h-auto min-h-[300px]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;