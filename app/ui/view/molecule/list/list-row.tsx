import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ListRowProps {
  children: ReactNode;
  textColor?: 'red' | 'black';
}
export function ListRow({ children, textColor = 'black' }: ListRowProps) {
  return (
    <div
      className={twMerge(
        'border-solid border-gray-300 border-b-[1px] last:border-b-0 py-4 font-medium text-md hover:bg-gray-100 group hover:first:rounded-t-xl hover:last:rounded-b-xl',
        textColor === 'red' ? 'text-red-500' : 'text-zinc-700',
      )}
    >
      {children}
    </div>
  );
}
