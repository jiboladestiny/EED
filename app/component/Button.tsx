import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled = true }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`btn btn-neutral`}
      onClick={onClick}
      disabled={!disabled}
    >
      {children}
    </button>
  );
};

export default Button;
