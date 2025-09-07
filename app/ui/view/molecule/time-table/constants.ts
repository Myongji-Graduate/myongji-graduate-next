export const DAY_TO_COL: Record<string, number> = {
  월요일: 0,
  화요일: 1,
  수요일: 2,
  목요일: 3,
  금요일: 4,
};

export const DAY_START = 8 * 60;
export const DAY_END = 22 * 60;
export const DAY_RANGE = DAY_END - DAY_START;

export const DAYS = ['월', '화', '수', '목', '금'];

export const TIMETABLE_CONFIG = {
  height: 650,
  timeSlotHeight: 60,
} as const;

export const TIMETABLE_ITEM_COLORS_BASE = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-purple-100 text-purple-800',
  'bg-pink-100 text-pink-800',
  'bg-red-100 text-red-800',
  'bg-indigo-100 text-indigo-800',
  'bg-teal-100 text-teal-800',
  'bg-gray-100 text-gray-800',
] as const;

export const TIMETABLE_ITEM_COLORS_ACTIVE = [
  'bg-blue-200 text-blue-900',
  'bg-green-200 text-green-900',
  'bg-yellow-200 text-yellow-900',
  'bg-purple-200 text-purple-900',
  'bg-pink-200 text-pink-900',
  'bg-red-200 text-red-900',
  'bg-indigo-200 text-indigo-900',
  'bg-teal-200 text-teal-900',
  'bg-gray-200 text-gray-900',
] as const;
