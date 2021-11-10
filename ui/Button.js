import React, {forwardRef} from "react";

const Button = forwardRef(({ children, ...props }, ref) => {
  return (
    <button
      className="
      inline-flex items-center justify-center
      min-w-40 max-h-12 mx-auto my-4 px-4 py-2 rounded-3xl
      gradient-background hover:bg-primary-light hover:bg-opacity-50
      hover:scale-110 transition
      text-white font-helvetica font-medium text-2xl
      disabled:opacity-50 focus:outline-none focus:ring"
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
