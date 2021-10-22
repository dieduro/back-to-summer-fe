import React from "react";
import Image from "next/image";

const GoogleLoginButton = ({ children, ...props }) => {
  return (
    <button
      className="
      flex items-center justify-around
      w-4/5 h-12 mx-auto mb-4 px-4 py-2
      shadow
      bg-white border-2 hover:bg-primary-light
      text-secondary font-bold text-sm
      disabled:opacity-50 focus:outline-none focus:ring"
      {...props}
    >
      <Image src="/g-logo.png" width={18} height={18} />
      <span>Accedé con Google</span>
    </button>
  );
};

export default GoogleLoginButton;
