import React from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'gold' | 'dark' | 'ghost' | 'paper';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-flag text-paper hover:bg-flag-600 shadow-[0_2px_0_#7a2222]',
  gold: 'bg-gold text-ink hover:bg-gold-300 shadow-[0_2px_0_#8a6a2e]',
  dark: 'bg-army-700 text-paper border border-gold/30 hover:bg-army-600 hover:border-gold/60',
  ghost: 'text-paper/80 hover:bg-white/5 hover:text-paper',
  paper: 'bg-paper text-ink border border-ink/20 hover:bg-paper-200'
};

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg'
};

export function Button({ variant = 'dark', size = 'md', className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-display font-bold uppercase tracking-wide transition-[background-color,border-color,color,transform] duration-150 ease-out active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:active:translate-y-0',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...rest} />);


}