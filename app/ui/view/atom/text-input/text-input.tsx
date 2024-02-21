'use client';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { getInputColors } from '@/app/utils/style/color.util';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password';
  defaultValue?: string;
  value?: string;
  icon?: React.ElementType;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onValueChange?: (value: unknown) => void;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    type,
    defaultValue,
    value,
    icon,
    error = false,
    errorMessage,
    disabled = false,
    placeholder,
    className,
    onValueChange,
    ...props
  },
  ref,
) {
  const Icon = icon;

  return (
    <>
      <div
        className={twMerge(
          'relative w-full flex items-center min-w-[10rem] outline-none rounded-lg transition duration-100 border',
          'shadow-sm',
          getInputColors(disabled, error),
          'has-[:focus]:ring-2',
          'has-[:focus]:border-blue-400 has-[:focus]:ring-blue-200',
          className,
        )}
      >
        {Icon ? <Icon className="shrink-0 h-5 w-5 ml-2.5 text-gray-6" /> : null}
        <input
          {...props}
          ref={ref}
          defaultValue={defaultValue}
          value={value}
          type={type}
          className={twMerge(
            'w-full focus:outline-none focus:ring-0 border-none bg-transparent text-sm rounded-lg transition duration-100 py-2',
            'text-black-1',
            Icon ? 'pl-2' : 'pl-3',
            error ? 'pr-3' : 'pr-4',
            disabled ? 'text-gray-6 placeholder:text-gray-6' : 'placeholder:text-gray-6',
          )}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            onValueChange?.(e.target.value);
          }}
        />
      </div>
      {error && errorMessage ? <p className={twMerge('text-sm text-etc-red mt-1')}>{errorMessage}</p> : null}
    </>
  );
});

export default TextInput;