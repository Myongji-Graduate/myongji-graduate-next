import type { PendingFilters } from '@/app/(sub-page)/lecture-finder/components/type';

export function validateLectureFilters(pending: PendingFilters) {
  const lacksMajor = !pending.major;
  const lacksYear = !pending.year;
  const lacksCategory = pending.category === 'all';

  const errors: string[] = [];
  if (lacksMajor) errors.push('전공을 선택해주세요');
  if (lacksYear) errors.push('입학년도를 선택해주세요');
  if (lacksCategory) errors.push('카테고리를 선택해주세요');

  return {
    isValid: errors.length === 0,
    errors,
    lacksMajor,
    lacksYear,
    lacksCategory,
  };
}
