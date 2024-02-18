import { cva } from 'class-variance-authority';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'text' | 'delete';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'default';
}

export const ButtonVariants = cva(`flex justify-center items-center`, {
  variants: {
    variant: {
      primary: 'bg-primary rounded-[100px] text-white border-0 hover:bg-primary-hover',
      secondary: 'bg-white rounded-[100px] border-solid border-[1px] border-gray hover:bg-white-hover',
      text: 'font-medium text-slate-400 text-sm hover:text-slate-600',
      delete: 'py-2 px-3.5 bg-[#35353559] rounded-[7px] text-white leading-5 font-medium text-[18px]',
    },
    size: {
      default: '',
      xs: 'px-5 py-3 text-lg font-medium leading-5',
      sm: 'px-12 py-3.5 text-sm font-medium leading-3',
      md: 'px-6 py-4 text-lg font-medium leading-3',
      lg: 'px-32 py-6 text-3xl font-medium leading-9',
    },
  },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { label, variant = 'primary', size = 'default', ...props },
  ref,
) {
  return (
    <button className={ButtonVariants({ variant, size })} {...props} ref={ref}>
      {label}
    </button>
  );
});
