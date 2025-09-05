import { cn } from '@/app/utils/shadcn/utils';
import { ReactNode } from 'react';

export interface ListRow {
  id: number | string;
  [key: string]: string | number | boolean;
}

export interface TimeTableListProps<T extends ListRow> {
  data: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  children?: ReactNode;
  emptyDataRender?: () => ReactNode;
}

export function TimeTableList<T extends ListRow>({
  data,
  renderItem,
  children,
  emptyDataRender,
}: TimeTableListProps<T>) {
  const hasNotData = data.length === 0;

  return (
    <div
      className={cn(
        'rounded-xl border border-gray-100 py-2 w-full',
        'h-[350px] overflow-y-scroll',
        hasNotData && 'flex justify-center items-center',
      )}
    >
      {hasNotData && emptyDataRender ? emptyDataRender() : null}

      {renderItem ? data.map((item, i) => renderItem(item, i)) : null}

      {!renderItem ? children : null}
    </div>
  );
}
