'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    // Base styles
                    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-blue/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                    // Variants
                    {
                        'bg-slate-blue text-off-white hover:bg-slate-blue/90 shadow-lg hover:shadow-xl':
                            variant === 'primary',
                        'bg-stone-gray text-off-white hover:bg-stone-gray/90':
                            variant === 'secondary',
                        'border-2 border-slate-blue text-slate-blue hover:bg-slate-blue hover:text-off-white':
                            variant === 'outline',
                        'text-slate-blue hover:bg-slate-blue/10': variant === 'ghost',
                    },
                    // Sizes
                    {
                        'text-sm px-4 py-2': size === 'sm',
                        'text-base px-6 py-3': size === 'md',
                        'text-lg px-8 py-4': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
