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
