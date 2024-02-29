import { ReactNode } from 'react';

export type ListRow = { [key: string]: string | number; id: number };
type ListRootProps = {
  data: ListRow[];
  render: (item: ListRow, index: number) => ReactNode;
};

export function ListRoot({ data, render }: ListRootProps) {
  return (
    <div className="rounded-2xl border-[1px] border-black-2 w-full">
      {data.map((item, index) => render(item, index))}
    </div>
  );
}
