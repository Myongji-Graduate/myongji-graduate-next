import { ReactNode } from 'react';

type TableRootProps = {
  children: ReactNode;
};

export function TableRoot({ children }: TableRootProps) {
  return <div className="flex flex-col gap-2.5 w-[800px]">{children}</div>;
}
