import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'petal' | 'earth' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-4.5 py-2.5 rounded-full gap-2',
    lg: 'text-base px-6 py-3 rounded-full gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-sage-700 text-cream-50 hover:bg-sage-800 shadow-sm hover:shadow-md shadow-sage-900/10 active:bg-sage-900',
    secondary:
      'bg-sage-100 text-sage-900 hover:bg-sage-200 border border-sage-200/80 active:bg-sage-300',
    petal:
      'bg-petal-400 text-white hover:bg-petal-500 shadow-sm hover:shadow-md shadow-petal-900/10 active:bg-petal-600',
    earth:
      'bg-earth-700 text-cream-50 hover:bg-earth-800 shadow-sm shadow-earth-900/10 active:bg-earth-900',
    outline:
      'border border-cream-300 text-earth-800 bg-white/70 hover:bg-cream-100 hover:border-cream-400 backdrop-blur-sm',
    ghost:
      'text-earth-700 hover:text-earth-900 hover:bg-sage-100/60 active:bg-sage-200/60',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
