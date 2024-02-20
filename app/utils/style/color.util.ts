import { twMerge } from 'tailwind-merge';

export const getInputColors = (isDisabled: boolean, hasError = false) => {
  return twMerge(
    isDisabled ? 'bg-gray-1' : 'bg-white',
    !isDisabled && 'hover:bg-gray-50',
    isDisabled && 'bg-gray-1',
    hasError && 'text-etc-red',
    hasError ? 'border-etc-red' : 'border-gray-2',
  );
};
