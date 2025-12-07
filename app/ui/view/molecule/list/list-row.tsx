import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  textColor?: 'gray' | 'black';
}

export function ListRow({ children, textColor = 'black', className, ...props }: ListRowProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'border-solid border-gray-300 border-b-[1px] last:border-b-0 py-4 font-medium text-sm xl:text-base 2xl:text-lg hover:bg-gray-100',
        textColor === 'gray' ? 'text-zinc-400' : 'text-zinc-700',
        className,
      )}
    >
      {children}
    </div>
  );
}
