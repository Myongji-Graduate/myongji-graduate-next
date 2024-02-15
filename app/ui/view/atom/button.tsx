import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
export function Button({ children, className, variant = 'primary', size = 'md' }: ButtonProps) {
  const ButtonVariants = cva(
    `
    flex justify-center items-center px-[6px] py-[1px]
    `,
    {
      variants: {
        variant: {
          primary: 'bg-primary rounded-[100px] text-white border-0',
          secondary: 'bg-white rounded-[100px] border-solid border-[1px] border-gray',
          text: '',
        },
        size: {
          default: '',
          xs: 'w-[116px] h-[47px] text-[18px] font-medium leading-5',
          sm: 'w-[144px] h-[40px] text-[14px] font-medium leading-3',
          md: 'w-[198px] h-[50px] text-[18px] font-medium leading-3',
          lg: 'w-[396px] h-[80px] text-[30px] font-medium leading-9',
        },
      },
      defaultVariants: {
        variant: 'primary',
        size: 'md',
      },
    },
  );
  return <button className={ButtonVariants({ variant, size })}>{children}</button>;
}
