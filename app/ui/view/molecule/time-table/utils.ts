import {
  DAY_TO_COL,
  DAY_START,
  DAY_END,
  DAY_RANGE,
  TIMETABLE_ITEM_COLORS_ACTIVE,
  TIMETABLE_ITEM_COLORS_BASE,
} from './constants';
import type { TimetableItem, TimeSlot, TimeRange } from './types';

export function parseHHMM(str: string): TimeSlot {
  return { h: Number(str.slice(0, 2)), m: Number(str.slice(3, 5)) };
}

export function parseTimeRange(timeStr: string): TimeRange {
  const [s, e] = timeStr.split(' - ').map((s) => s.trim());
  const { h: sh, m: sm } = parseHHMM(s);
  const { h: eh, m: em } = parseHHMM(e);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  return { start, end };
}

export function normalizeLectures(raw: any[]): TimetableItem[] {
  const items: TimetableItem[] = [];
  raw.forEach((lec, idx) => {
    (
      [
        { day: lec.day1, startMinute: lec.startMinute1, endMinute: lec.endMinute1 },
        { day: lec.day2, startMinute: lec.startMinute2, endMinute: lec.endMinute2 },
      ] as const
    ).forEach((slot, sIdx) => {
      if (!slot.day || !slot.startMinute || !slot.endMinute) return;
      const col = DAY_TO_COL[slot.day] ?? -1;
      if (col < 0) return;

      const start = slot.startMinute;
      const end = slot.endMinute;

      const topPct = Math.max(0, ((start - DAY_START) / DAY_RANGE) * 100);
      const heightPct = Math.max(2, ((end - start) / DAY_RANGE) * 100);

      items.push({
        id: `${lec.id}-${sIdx}`,
        day: slot.day,
        col,
        start,
        end,
        topPct,
        heightPct,
        time: slot.startMinute === lec.startMinute1 ? lec.time1 : lec.time2,
        name: lec.name,
        lectureCode: lec.lectureCode,
      });
    });
  });
  return items;
}

export const toHHMM = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}${String(m % 60).padStart(2, '0')}`;

export const formatRangeHHMM = (start: number, end: number) => `${toHHMM(start)} - ${toHHMM(end)}`;

type Variant = 'base' | 'active' | 'muted';

export function colorClassByKey(key: string | number, variant: Variant = 'base') {
  const s = String(key);
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  const idx = hash % TIMETABLE_ITEM_COLORS_BASE.length;

  if (variant === 'active') return TIMETABLE_ITEM_COLORS_ACTIVE[idx];
  return TIMETABLE_ITEM_COLORS_BASE[idx];
}
