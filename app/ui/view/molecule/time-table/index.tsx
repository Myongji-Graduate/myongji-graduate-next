import React, { useMemo, useRef, useState } from 'react';
import { TableHeader } from '../table/table-header';
import Grid from '../grid';
import { TimeTableList } from './time-table-list';
import { TimeDisplay } from './time-display';
import { LectureItem } from './lecture-item';
import { normalizeLectures } from './utils';
import { DAY_START, DAY_END, DAY_RANGE, DAYS } from './constants';
import { cn } from '@/app/utils/shadcn/utils';
import type { TimeTableProps } from './types';
import type { ListRow } from '../list/list-root';

export function TimeTable<T extends ListRow>({ data, isEditable = true }: TimeTableProps<T>) {
  const items = useMemo(() => normalizeLectures(data), [data]);
  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let m = DAY_START; m <= DAY_END; m += 60) arr.push(m);
    return arr;
  }, []);

  const rightRef = useRef<HTMLDivElement>(null);
  const [hiddenCodes, setHiddenCodes] = useState<Set<string>>(new Set());
  const hideBlock = (code: string) => setHiddenCodes((prev) => new Set(prev).add(code));

  return (
    <div className="flex flex-col gap-2.5 w-full" data-testid="table-data">
      <div className="flex items-stretch">
        <div className="w-16 shrink-0" />
        <div className="flex-1">
          <TableHeader headerInfo={DAYS} cols={5} />
        </div>
      </div>

      <TimeTableList data={data}>
        <div className="flex w-full overflow-hidden">
          <TimeDisplay hours={hours} />

          <div ref={rightRef} className="flex-1 relative">
            <div className="absolute inset-0 pointer-events-none">
              {hours.map((m, idx) => {
                const topPct = ((m - DAY_START) / DAY_RANGE) * 100;
                return (
                  <div
                    key={idx}
                    className="absolute left-0 right-0 border-t border-gray-100 py-2"
                    style={{ top: `${topPct}%` }}
                  />
                );
              })}
            </div>

            <Grid cols={5}>
              {DAYS.map((_, col) => {
                const colItems = items.filter((i) => i.col === col && !hiddenCodes.has(i.lectureCode));

                return (
                  <Grid.Column key={col}>
                    <div
                      className={cn(
                        'relative overflow-hidden h-[350px]',
                        'w-[50px] min-[380px]:w-[80px] sm:w-[120px] md:w-[170px]',
                      )}
                    >
                      {colItems.map((item) => (
                        <LectureItem key={item.id} item={item} isEditable={isEditable} onRemove={hideBlock} />
                      ))}
                    </div>
                  </Grid.Column>
                );
              })}
            </Grid>
          </div>
        </div>
      </TimeTableList>
    </div>
  );
}
