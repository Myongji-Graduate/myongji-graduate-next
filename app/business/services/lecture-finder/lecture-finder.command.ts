'use client';

import { API_PATH } from '../../api-path';
import type {
  LectureRowsResponse,
  PopularInitQuery,
  PopularByCategoryQuery,
  PopularApiResponse,
} from './lecture-finder.types';

export async function fetchPopularInit(query: PopularInitQuery): Promise<LectureRowsResponse> {
  const params = new URLSearchParams();
  if (typeof query.limit === 'number') params.set('limit', String(query.limit));
  if (query.cursor) params.set('cursor', query.cursor);

  const res = await fetch(`${API_PATH.lectures}/popular?${params.toString()}`);
  if (!res.ok) throw new Error(`fetchPopularInit failed: ${res.status}`);

  const json = (await res.json()) as PopularApiResponse;
  return Array.isArray(json) ? json : json.lectures ?? [];
}

export async function fetchPopularByCategory(query: PopularByCategoryQuery): Promise<LectureRowsResponse> {
  const params = new URLSearchParams();
  params.set('major', String(query.major));
  params.set('entryYear', String(query.entryYear));
  params.set('category', query.category);
  if (typeof query.limit === 'number') params.set('limit', String(query.limit));
  if (query.cursor) params.set('cursor', query.cursor);

  const res = await fetch(`${API_PATH.lectures}/popular/by-category?${params.toString()}`);
  if (!res.ok) throw new Error(`fetchPopularByCategory failed: ${res.status}`);

  const json = (await res.json()) as PopularApiResponse;
  return Array.isArray(json) ? json : json.lectures ?? [];
}

export { fetchPopularInit as fetchFindLectures };
export { fetchPopularByCategory as fetchPopularLectures };
