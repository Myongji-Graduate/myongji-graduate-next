import { ReactNode } from 'react';

type TableHeaderProps = {
  children: ReactNode;
};
export function TableHeader({ children }: TableHeaderProps) {
  return (
    <div className="text-light-blue-6 leading-4 text-lg font-bold bg-light-blue-1 py-5 rounded-[100px]">{children}</div>
  );
}
