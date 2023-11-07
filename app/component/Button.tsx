"use client"
import React, { ReactNode } from "react";
import add from '../../public/icons/add.png'
import Image from "next/image";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Update the prop type
  disabled?: boolean;
  loading?: boolean;
  plus?: boolean;
  error?: boolean
  type?: string
}

const Button = ({ children, onClick, disabled = true, loading= false, plus = false , error = false,type = "button" }: ButtonProps) => {

  return (
    <button
      type="submit"
      className={`btn btn-neutral flex gap-3 items-center ${error && "btn-error text-white"}`}
      onClick={onClick}
      disabled={!disabled}
    >
      {children} {plus && <Image alt="add" src={add} width={18} height={18} />}  {loading && <span className="loader"></span>}
    </button>
  );
};

export default Button;
