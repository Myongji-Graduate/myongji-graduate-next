import { TimetableLectureRow } from '@/app/type/timetable/types';

interface FetchParams {
  year: number;
  semester: number;
  campus: string;
  filter: string;
  keyword: string;
  professor: string;
  recommendedCategory?: string;
}

export const fetchSearchTimetableLecturesClient = async (params: FetchParams) => {
  const query = new URLSearchParams(params as unknown as Record<string, string>).toString();
  const res = await fetch(`/api/timetable-lectures/filter?${query}`);
  if (!res.ok) throw new Error('Failed to fetch lectures');
  return res.json() as Promise<TimetableLectureRow[]>;
};
