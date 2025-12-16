import { cn } from '@/app/utils/shadcn/utils';
import { ReactNode } from 'react';
import type { ListRow } from '../list/list-root';
import { TIMETABLE_CONFIG } from './constants';

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
        'rounded-xl py-2 w-full',
        'overflow-y-scroll',
        'scrollbar-hide',
        hasNotData && 'flex justify-center items-center',
      )}
      style={{ height: TIMETABLE_CONFIG.height }}
    >
      {hasNotData && emptyDataRender ? emptyDataRender() : null}

      {renderItem ? data.map((item, i) => renderItem(item, i)) : null}

      {!renderItem ? children : null}
    </div>
  );
}
