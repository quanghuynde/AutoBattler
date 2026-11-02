import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  tone?: 'dark' | 'paper';
  dismissible?: boolean;
}

const SIZES = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' };
const EASE = [0.23, 1, 0.32, 1] as const;

export function Modal({ open, onClose, title, subtitle, children, footer, size = 'md', tone = 'dark', dismissible = true }: ModalProps) {
  useEffect(() => {
    if (!open || !dismissible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, dismissible]);

  const paper = tone === 'paper';

  return createPortal(
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onMouseDown={(e) => {
          if (dismissible && e.target === e.currentTarget) onClose();
        }}>
        
          <motion.div
          role="dialog"
          aria-modal="true"
          className={twMerge(
            'relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-xl shadow-2xl',
            SIZES[size],
            paper ? 'paper-texture text-ink border border-ink/20' : 'bg-army-800 text-paper border border-gold/25'
          )}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.22, ease: EASE }}>
          
            {(title || dismissible) &&
          <header className={twMerge('flex items-start justify-between gap-4 border-b px-5 py-4', paper ? 'border-ink/15' : 'border-gold/15')}>
                <div className="min-w-0">
                  {title && <h2 className="font-display text-2xl font-bold uppercase leading-tight tracking-wide">{title}</h2>}
                  {subtitle && <p className={twMerge('mt-0.5 text-sm', paper ? 'text-ink-400' : 'text-paper/60')}>{subtitle}</p>}
                </div>
                {dismissible &&
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className={twMerge(
                'grid h-9 w-9 shrink-0 place-items-center rounded-md transition-colors duration-150',
                paper ? 'hover:bg-ink/10' : 'hover:bg-white/10'
              )}>
              
                    <XIcon className="h-5 w-5" />
                  </button>
            }
              </header>
          }
            <div className="scrollbar-thin flex-1 overflow-y-auto px-5 py-4">{children}</div>
            {footer &&
          <footer className={twMerge('flex flex-wrap justify-end gap-2 border-t px-5 py-3', paper ? 'border-ink/15' : 'border-gold/15')}>
                {footer}
              </footer>
          }
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>,
    document.body
  );
}