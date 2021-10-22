import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button
      className="
      inline-flex items-center justify-center
      w-32 max-h-12 mx-auto my-4 px-4 py-2 rounded-xl
      bg-white border-2 border-primary-dark hover:bg-primary-light
      text-secondary font-bold
      disabled:opacity-50 focus:outline-none focus:ring"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
