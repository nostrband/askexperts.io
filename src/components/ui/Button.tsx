import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  external?: boolean;
  disabled?: boolean;
};

export default function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  onClick,
  type = 'button',
  external = false,
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors';
  
  const variantStyles = {
    primary: 'bg-[#6A4C93] hover:bg-[#5A3C83] text-white py-3 px-6',
    secondary: 'bg-white border border-[#0F172A]/10 hover:bg-gray-50 text-[#0F172A] py-3 px-6',
    text: 'text-[#0F172A] hover:text-[#6A4C93] underline-offset-4 hover:underline',
  };
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  if (href) {
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
      
    return (
      <Link href={href} className={buttonStyles} {...linkProps}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      className={`${buttonStyles} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}