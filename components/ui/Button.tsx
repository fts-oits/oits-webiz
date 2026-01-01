import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  // Updated focus ring color to #642cdc (Brand Purple)
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#642cdc] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform will-change-transform";
  
  const variants = {
    // Added hover opacity for transparency effect
    primary: "bg-brand-blue text-white hover:opacity-90 shadow-md hover:shadow-lg",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200/90",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900",
    ghost: "hover:bg-slate-100/50 text-slate-700 hover:text-slate-900",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-8 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};