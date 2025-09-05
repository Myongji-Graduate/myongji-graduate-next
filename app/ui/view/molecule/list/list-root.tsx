import { cn } from '@/app/utils/shadcn/utils';
import { ReactNode } from 'react';

export interface ListRow {
  id: number | string;
  [key: string]: string | number | boolean | null;
}
export interface ListRootProps<T extends ListRow> {
  data: T[];
  render?: (item: T, index: number) => ReactNode;
  isScrollList?: boolean;
  emptyDataRender?: () => ReactNode;
}

export function ListRoot<T extends ListRow>({ data, render, isScrollList = false, emptyDataRender }: ListRootProps<T>) {
  const hasNotData = emptyDataRender && data.length === 0;
  return (
    <div
      className={cn(
        'rounded-xl border-[1px] border-gray-300 w-full ',
        isScrollList && 'h-72 overflow-auto',
        hasNotData && 'flex justify-center items-center',
      )}
      tabIndex={isScrollList ? 0 : -1}
    >
      {data.map((item, index) => render && render(item, index))}
      {hasNotData ? emptyDataRender() : null}
    </div>
  );
}
