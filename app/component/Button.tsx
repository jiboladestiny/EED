import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`btn btn-neutral ${disabled ? "opacity-80 cursor-not-allowed" : ""}`}
      onClick={onClick}
      disabled={disabled}  
    >
      {children}
    </button>
  );
};

export default Button;
