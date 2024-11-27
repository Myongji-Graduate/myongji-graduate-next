import { cn } from '@/app/utils/shadcn/utils';
import { cva } from 'class-variance-authority';
import React from 'react';
import LoadingSpinner from '../loading-spinner/loading-spinner';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'default' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'text' | 'list' | 'outlined' | 'dark';
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
}

export const ButtonVariants = cva(`flex justify-center items-center`, {
  variants: {
    variant: {
      primary: 'bg-primary rounded-[100px] text-white border-0 hover:bg-primary-hover',
      outlined: 'rounded-[100px] text-primary border-solid border-[1px] border-primary',
      dark: 'bg-dark rounded-[100px] text-white border-0 hover:bg-dark-hover',
      secondary: 'bg-white rounded-[100px] border-solid border-[1px] border-gray-6 hover:bg-white-hover',
      text: 'font-medium text-slate-500 text-sm hover:text-slate-600',
      list: 'py-1 px-3 bg-blue-600 rounded-[7px] text-white leading-5 font-medium text-base hover:bg-blue-700',
    },
    size: {
      default: '',
      xs: 'px-5 py-2.5 text-sm font-medium leading-5',
      sm: 'px-10 py-2.5 text-xs font-medium leading-3',
      md: 'px-20 py-4 text-base font-medium leading-3',
      lg: 'px-28 py-4 text-2xl font-medium leading-9',
      xl: 'px-16 py-4 text-xl md:px-36 md:py-5 md:text-3xl font-medium leading-9',
    },
  },
});

export const LoadingIconVariants = cva('animate-spin shrink-0', {
  variants: {
    size: {
      default: 'h-6 w-6 mr-1.5 -ml-1',
      xs: 'h-6 w-6 mr-1.5 -ml-1',
      sm: 'h-5 w-5 mr-1.5 -ml-1',
      md: 'h-6 w-6 mr-1.5 -ml-1',
      lg: 'h-12 w-12 mr-1.5 -ml-1',
      xl: 'h-12 w-12 mr-1.5 -ml-1',
    },
  },
});

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, label, variant = 'primary', size = 'default', loading, disabled, ...props },
  ref,
) {
  const isDisabled = loading || disabled;

  return (
    <button
      className={cn(isDisabled && 'opacity-50 cursor-not-allowed', ButtonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
      ref={ref}
    >
      {loading ? (
        <LoadingSpinner className={cn(LoadingIconVariants({ size }))} style={{ transition: `width 150ms` }} />
      ) : null}
      {label}
    </button>
  );
});

export default Button;
