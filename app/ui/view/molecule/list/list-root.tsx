import { ReactNode } from 'react';

type ListRootProps = {
  children: ReactNode;
};

export function ListRoot({ children }: ListRootProps) {
  return <div className="rounded-2xl border-[1px] border-black-2 w-full">{children}</div>;
}
