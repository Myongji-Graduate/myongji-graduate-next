import { z } from 'zod';
import { YEARS, LECTURE_FINDER_CATEGORY_KO } from './type';
import { major as MAJORS } from '@/app/utils/majors/major';

function toEnumArray<T extends string>(arr: readonly T[]): [T, ...T[]] {
  if (arr.length === 0) {
    throw new Error('Enum values array cannot be empty');
  }
  return [arr[0], ...arr.slice(1)];
}

const MajorsZod = z.string().refine((val) => MAJORS.includes(val as any) && val !== '', {
  message: '전공을 선택해주세요',
});

const YearsZod = z.string().refine((val) => YEARS.includes(val as any) && val !== '', {
  message: '학번을 선택해주세요',
});

const CATEGORY_VALUES = toEnumArray([...Object.keys(LECTURE_FINDER_CATEGORY_KO), 'ALL'] as const);
const CategoryKeyZod = z.enum(CATEGORY_VALUES).optional().default('ALL');

export const LectureFiltersObject = z.object({
  major: MajorsZod,
  year: YearsZod,
  category: CategoryKeyZod,
});

export type LectureFilters = z.infer<typeof LectureFiltersObject>;

export function validateLectureFilters(data: unknown) {
  return LectureFiltersObject.parse(data);
}
