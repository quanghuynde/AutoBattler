import React from 'react';
import { StarIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface StarRowProps {
  star: number;
  className?: string;
  size?: string;
}

export function StarRow({ star, className, size = 'h-3 w-3' }: StarRowProps) {
  return (
    <span className={twMerge('inline-flex items-center gap-px', className)} aria-label={`${star} sao`}>
      {[1, 2, 3].map((i) =>
      <StarIcon key={i} className={twMerge(size, i <= star ? 'fill-gold text-gold' : 'fill-transparent text-paper/40')} strokeWidth={2} />
      )}
    </span>);

}