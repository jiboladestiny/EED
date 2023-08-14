
import React, { ReactNode } from "react";

interface ButtonProps{
  children: ReactNode,
  onClick?: () => void;
}
const Button = ({ children, onClick}: ButtonProps) => {
  return (
    <button type="submit" className="btn btn-neutral" onClick={onClick}>
 {children}
    </button>
  );
};

export default Button;
