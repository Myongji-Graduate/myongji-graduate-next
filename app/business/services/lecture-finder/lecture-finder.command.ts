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

export class SearchError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'SearchError';
  }
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

  if (res.status === 404) {
    throw new SearchError('해당 카테고리에 해당하는 데이터가 존재하지 않습니다.', res.status);
  }

  if (res.status === 400) {
    throw new SearchError('해당 학과 학번에 해당하는 데이터가 존재하지 않습니다.', res.status);
  }

  if (!res.ok) {
    throw new SearchError('강의 검색 중 오류가 발생했습니다.', res.status);
  }

  const json = (await res.json()) as PopularApiResponse;
  return normalizePopular(json);
}

export async function fetchPopularAllPaged(
  query: PopularByCategoryQuery & { cursor?: string; limit?: number; categoryName?: string },
): Promise<NormalizedPage> {
  const params = toSearchParams({
    major: query.major,
    entryYear: query.entryYear,
    category: query.categoryName || query.category,
    limit: query.limit,
    cursor: query.cursor,
  });

  const res = await fetch(`${API_PATH.lectureFinder}/by-category?${params.toString()}`);

  if (res.status === 404) {
    throw new SearchError('해당 카테고리에 해당하는 데이터가 존재하지 않습니다.', res.status);
  }

  if (res.status === 400) {
    throw new SearchError('해당 학과 학번에 해당하는 데이터가 존재하지 않습니다.', res.status);
  }

  if (!res.ok) {
    throw new SearchError('강의 검색 중 오류가 발생했습니다.', res.status);
  }

  const data = await res.json();
  const normalized = normalizePopular(data as PopularApiResponse);

  if (data && typeof data === 'object' && 'categoryName' in data) {
    return {
      ...normalized,
      categoryName: data.categoryName as string,
    };
  }

  return normalized;
}
