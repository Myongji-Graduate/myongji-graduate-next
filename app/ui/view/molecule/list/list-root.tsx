import { ReactNode } from 'react';

type ListRootProps<T> = {
  data: T[];
  render: (item: T) => ReactNode;
};

export function ListRoot<T>({ data, render }: ListRootProps<T>) {
  return <div className="rounded-2xl border-[1px] border-black-2 w-full">{data.map((item) => render(item))}</div>;
}
