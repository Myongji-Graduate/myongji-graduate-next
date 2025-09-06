export const DAY_TO_COL: Record<string, number> = {
  월요일: 0,
  화요일: 1,
  수요일: 2,
  목요일: 3,
  금요일: 4,
};

export const DAY_START = 8 * 60;
export const DAY_END = 15 * 60;
export const DAY_RANGE = DAY_END - DAY_START;

export const DAYS = ['월', '화', '수', '목', '금'];

export const TIMETABLE_CONFIG = {
  height: 350,
  timeSlotHeight: 60,
} as const;

export const TIMETABLE_ITEM_COLORS = [
  'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'bg-green-100 text-green-800 hover:bg-green-200',
  'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  'bg-purple-100 text-purple-800 hover:bg-purple-200',
  'bg-pink-100 text-pink-800 hover:bg-pink-200',
  'bg-red-100 text-red-800 hover:bg-red-200',
  'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  'bg-teal-100 text-teal-800 hover:bg-teal-200',
  'bg-gray-100 text-gray-800 hover:bg-gray-200',
] as const;
