import { API_PATH } from '../../api-path';
import type { DetailedLecture, LectureInfoPagedResult } from './lecture-finder.types';

export async function fetchLectureInfo(query: { subject: string }) {
  const params = new URLSearchParams({
    subject: query.subject,
  });

  const res = await fetch(`${API_PATH.lecturesInfo}?${params.toString()}`);
  const json = (await res.json()) as DetailedLecture[];
  return json;
}

export async function fetchLectureInfoPaged(query: {
  subject: string;
  professor: string;
  page: number;
  size: number;
  sort?: string;
}) {
  const params = new URLSearchParams({
    subject: query.subject,
    professor: query.professor,
    page: query.page.toString(),
    size: query.size.toString(),
    sort: query.sort ?? 'id,ASC',
  });

  const res = await fetch(`${API_PATH.lectureReviews}?${params.toString()}`);
  const json = (await res.json()) as LectureInfoPagedResult;
  return json;
}
