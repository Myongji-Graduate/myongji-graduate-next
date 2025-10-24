'use client';
import { API_PATH } from '../../api-path';
import type {
  PopularApiResponse,
  NormalizedPage,
  PopularInitQuery,
  PopularByCategoryQuery,
} from './lecture-finder.types';

export function normalizePopular(res: PopularApiResponse): NormalizedPage {
  if (Array.isArray(res)) {
    return { items: res, pageInfo: { hasMore: false } };
  }
  return {
    items: res.lectures ?? [],
    pageInfo: {
      nextCursor: res.pageInfo?.nextCursor,
      hasMore: !!res.pageInfo?.hasMore || !!res.pageInfo?.nextCursor,
      pageSize: res.pageInfo?.pageSize,
    },
  };
}

type PageParam = { cursor?: string; limit?: number };

function toSearchParams(obj: Record<string, unknown>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v)) v.forEach((x) => p.append(k, String(x)));
    else p.append(k, String(v));
  }
  return p;
}

export async function fetchPopularInitPaged(query: PopularInitQuery & PageParam): Promise<NormalizedPage> {
  const params = toSearchParams({
    limit: query.limit,
    cursor: query.cursor,
  });

  const res = await fetch(`${API_PATH.lectureFinder}?${params.toString()}`);
  const json = (await res.json()) as PopularApiResponse;
  return normalizePopular(json);
}

export async function fetchPopularByCategoryPaged(query: PopularByCategoryQuery & PageParam): Promise<NormalizedPage> {
  const params = toSearchParams({
    major: query.major,
    entryYear: query.entryYear,
    category: query.category,
    limit: query.limit,
    cursor: query.cursor,
  });

  const res = await fetch(`${API_PATH.lectureFinder}/by-category?${params.toString()}`);
  const json = (await res.json()) as PopularApiResponse;
  return normalizePopular(json);
}
