import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ListRow {
  id: number;
  [key: string]: string | number;
}
interface ListRootProps<T extends ListRow> {
  data: T[];
  render: (item: T, index: number) => ReactNode;
  isScrollList?: boolean;
  emptyDataRender?: () => ReactNode;
}

export function ListRoot<T extends ListRow>({ data, render, isScrollList = false, emptyDataRender }: ListRootProps<T>) {
  const hasNotData = emptyDataRender && data.length === 0;
  return (
    <div className={twMerge('rounded-xl border-[1px] border-gray-300 w-full ', isScrollList && 'h-72 overflow-auto')}>
      {data.map((item, index) => render(item, index))}
      {hasNotData ? emptyDataRender() : null}
    </div>
  );
}
