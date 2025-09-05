import { DAY_START, DAY_END, DAY_RANGE, TIMETABLE_CONFIG } from './constants';

interface TimeDisplayProps {
  hours: number[];
}

export function TimeDisplay({ hours }: TimeDisplayProps) {
  return (
    <div className="w-16 shrink-0 relative">
      <div className="h-[350px] relative">
        {hours.map((m, idx) => {
          const topPct = ((m - DAY_START) / DAY_RANGE) * 100;
          const hh = String(Math.floor(m / 60)).padStart(2, '0');
          const mm = String(m % 60).padStart(2, '0');
          return (
            <div
              key={idx}
              className="absolute left-0 right-0 px-2 py-2 text-[10px] text-gray-400"
              style={{ top: `calc(${topPct}% - 8px)` }}
            >
              {hh}:{mm}
            </div>
          );
        })}
      </div>
    </div>
  );
}
