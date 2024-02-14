import { twMerge } from 'tailwind-merge';

export const getInputColors = (isDisabled: boolean, hasError = false) => {
  return twMerge(
    isDisabled ? 'bg-gray-100' : 'bg-white',
    !isDisabled && 'hover:bg-gray-50',
    isDisabled && 'bg-gray-100',
    hasError && 'text-red-500',
    hasError ? 'border-red-500' : 'border-gray-200',
  );
};
