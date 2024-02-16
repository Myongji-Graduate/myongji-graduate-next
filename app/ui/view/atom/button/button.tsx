import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'text' | 'delete';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'default';
  href?: string;
}
export function Button({ label, variant = 'primary', size = 'default', href, ...props }: ButtonProps) {
  const ButtonVariants = cva(`flex justify-center items-center px-[6px] py-[1px]`, {
    variants: {
      variant: {
        primary: 'bg-primary rounded-[100px] text-white border-0 hover:bg-primary-hover',
        secondary: 'bg-white rounded-[100px] border-solid border-[1px] border-gray hover:bg-white-hover',
        text: 'font-medium text-slate-400 text-sm hover:text-slate-600',
        delete: 'py-[7px] px-[14px] bg-[#35353559] rounded-[7px] text-white leading-5 font-medium text-[18px]',
      },
      size: {
        default: '',
        xs: 'w-[116px] h-[47px] text-lg font-medium leading-5',
        sm: 'w-[144px] h-10 text-sm font-medium leading-3',
        md: 'w-[198px] h-12 text-lg font-medium leading-3',
        lg: 'w-[396px] h-20 text-3xl font-medium leading-9',
      },
    },
  });

  if (href)
    return (
      <Link className={ButtonVariants({ variant, size })} href={href}>
        {label}
      </Link>
    );
  return (
    <button className={ButtonVariants({ variant, size })} {...props}>
      {label}
    </button>
  );
}
