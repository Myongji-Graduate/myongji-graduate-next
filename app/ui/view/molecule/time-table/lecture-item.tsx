import { X } from 'lucide-react';
import { colorClassByKey } from './utils';
import { formatRangeHHMM } from './utils';
import { cn } from '@/app/utils/shadcn/utils';
import type { TimetableItem } from './types';

interface LectureItemProps {
  item: TimetableItem;
  isEditable: boolean;
  onRemove: (lectureCode: string) => void;
  colorKey?: string | number;
}

export function LectureItem({ item, isEditable, onRemove, colorKey }: LectureItemProps) {
  const colorClass = colorClassByKey(colorKey ?? item.lectureCode);
  return (
    <div
      className={cn(
        'group absolute left-1 right-1 p-1 overflow-hidden rounded-lg py-2 px-1.5 md:text-xs text-[8px]',
        colorClass,
      )}
      style={{ top: `${item.topPct}%`, height: `${item.heightPct}%` }}
      data-cy={`timetable-lecture-${item.lectureCode}`}
    >
      {isEditable && (
        <button
          type="button"
          aria-label="삭제"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.lectureCode);
          }}
          className="absolute top-1 right-1 z-10 rounded-full p-1 bg-white/80 hover:bg-white shadow ring-1 ring-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto focus:opacity-100 focus:outline-none"
        >
          <X className="size-3" />
        </button>
      )}

      <div className="truncate font-semibold text-gray-700">{item.name}</div>
      <div className="opacity-70 whitespace-nowrap text-gray-500 tabular-nums md:text-[10px] text-[6px]">
        {formatRangeHHMM(item.start, item.end)}
      </div>
    </div>
  );
}
