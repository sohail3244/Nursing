import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", // primary or outline
  className = "" 
}) => {
  
  // PhonePe Colors logic
  const baseStyles = "px-6 py-2.5 rounded-full font-semibold transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-2 whitespace-nowrap";
  
  const variants = {
    primary: "bg-[#6739b7] hover:bg-[#5a2e9e] text-white shadow-purple-200",
    outline: "border-2 border-[#6739b7] text-[#6739b7] hover:bg-purple-50",
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;