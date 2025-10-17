'use client';

import { API_PATH } from '../../api-path';
import type {
  PopularApiResponse,
  NormalizedPage,
  PopularInitQuery,
  PopularByCategoryQuery,
} from './lecture-finder.types';
import { normalizePopular } from './lecture-finder.types';

type PageParam = { cursor?: string; limit?: number };

export async function fetchPopularInitPaged(query: PopularInitQuery & PageParam): Promise<NormalizedPage> {
  const params = new URLSearchParams();
  if (typeof query.limit === 'number') params.set('limit', String(query.limit));
  if (query.cursor) params.set('cursor', query.cursor);

  const res = await fetch(`${API_PATH.lectures}/popular?${params.toString()}`);
  if (!res.ok) throw new Error(`popularInit failed: ${res.status}`);

  const json = (await res.json()) as PopularApiResponse;
  return normalizePopular(json);
}

export async function fetchPopularByCategoryPaged(query: PopularByCategoryQuery & PageParam): Promise<NormalizedPage> {
  const params = new URLSearchParams();
  params.set('major', String(query.major));
  params.set('entryYear', String(query.entryYear));
  params.set('category', query.category);
  if (typeof query.limit === 'number') params.set('limit', String(query.limit));
  if (query.cursor) params.set('cursor', query.cursor);

  const res = await fetch(`${API_PATH.lectures}/popular/by-category?${params.toString()}`);
  if (!res.ok) throw new Error(`popularByCategory failed: ${res.status}`);

  const json = (await res.json()) as PopularApiResponse;
  return normalizePopular(json);
}
