import { API_PATH } from '../../api-path';
import type { DetailedLecture } from './lecture-finder.types';

export async function fetchFindeLectureInfo(query: { subject: string }) {
  const params = new URLSearchParams({
    subject: query.subject,
  });

  const res = await fetch(`${API_PATH.lecturesInfo}?${params.toString()}`);
  const json = (await res.json()) as DetailedLecture[];
  return json;
}
