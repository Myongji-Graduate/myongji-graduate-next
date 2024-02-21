import { ReactNode } from 'react';

type GridColumnProps = {
  children: ReactNode;
};

export function GridColumn({ children }: GridColumnProps) {
  return <div className={'place-self-center text-center'}>{children}</div>;
}
