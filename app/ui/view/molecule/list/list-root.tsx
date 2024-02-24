import { ReactNode } from 'react';

type ListRootProps = {
  data: (string | number)[][];
  render: (item: (string | number)[], index: number) => ReactNode;
};

export function ListRoot({ data, render }: ListRootProps) {
  return (
    <div className="rounded-2xl border-[1px] border-black-2 w-full">
      {data.map((item, index) => render(item, index))}
    </div>
  );
}
