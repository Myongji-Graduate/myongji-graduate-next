import { ReactNode } from 'react';

export interface ListRow {
  id: number;
  [key: string]: string | number;
}
interface ListRootProps {
  data: ListRow[];
  render: (item: ListRow, index: number) => ReactNode;
}

export function ListRoot({ data, render }: ListRootProps) {
  return (
    <div className="rounded-2xl border-[1px] border-black-2 w-full">
      {data.map((item, index) => render(item, index))}
    </div>
  );
}
