import React, {forwardRef} from "react";

const Button = forwardRef(({ size, children, ...props }, ref) => {
  
  const TEXT_CLASSES = {
    small: "text-md sm:text-xl",
    medium: "text-lg sm:text-2xl",
    large: "text-xl sm:text-3xl",
    default: "text-xl sm:text-2xl",
  }
  
  return (
    <button
      className={`
      inline-flex items-center justify-center
      min-w-40 max-h-12 mx-auto my-4 px-6 py-2 rounded-3xl
      gradient-background hover:bg-primary-light hover:bg-opacity-50
      hover:scale-110 transition
      text-white font-helvetica font-medium ${TEXT_CLASSES[size || "default"]}
      disabled:opacity-50 focus:outline-none focus:ring`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
