'use client';

import { API_PATH } from '../../api-path';
import { RecommendLectureData } from './recommend-lecture.type';
import { getToken } from '@/app/business/services/auth';
import fetchAX, { FetchAxError } from 'fetch-ax';

export const fetchRecommendLecture = async () => {
  const token = await getToken();
  try {
    const response = await fetchAX.get<RecommendLectureData>(API_PATH.recommendLecture, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err: unknown) {
    if (err instanceof FetchAxError) {
      if (err.response?.status === 400) {
        throw new Error('성적표를 재등록해주세요');
      }
    }

    throw new Error('채널톡으로 문의해주세요');
  }
};
