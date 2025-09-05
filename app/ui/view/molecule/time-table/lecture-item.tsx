import { X } from 'lucide-react';
import { formatRangeHHMM } from './utils';
import type { TimetableItem } from './types';

interface LectureItemProps {
  item: TimetableItem;
  isEditable: boolean;
  onRemove: (lectureCode: string) => void;
}

export function LectureItem({ item, isEditable, onRemove }: LectureItemProps) {
  return (
    <div
      className={`group absolute left-1 right-1 md:text-xs text-[8px] p-1 overflow-hidden rounded-none py-2 px-1.5 bg-light-blue-1 ${
        isEditable ? 'hover:bg-gray-200' : ''
      }`}
      style={{ top: `${item.topPct}%`, height: `${item.heightPct}%` }}
    >
      {isEditable && (
        <button
          type="button"
          aria-label="삭제"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.lectureCode);
          }}
          className="absolute top-1 right-1 z-10 rounded-full p-1
                     bg-white/80 hover:bg-white shadow ring-1 ring-gray-300
                     opacity-0 group-hover:opacity-100 transition-opacity
                     pointer-events-none group-hover:pointer-events-auto
                     focus:opacity-100 focus:outline-none"
        >
          <X className="size-3" />
        </button>
      )}

      <div className="truncate font-semibold">{item.name}</div>
      <div className="opacity-70 whitespace-nowrap text-gray-500 tabular-nums">
        {formatRangeHHMM(item.start, item.end)}
      </div>
    </div>
  );
}
