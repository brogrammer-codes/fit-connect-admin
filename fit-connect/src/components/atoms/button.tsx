import React from 'react'

type ButtonProps = {
    buttonText: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const Button = ({buttonText, onClick, disabled = false}: ButtonProps) => {
  return (<button type="button" className="text-white bg-[#4D6890] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={onClick} disabled={disabled}>{buttonText}</button>)
}