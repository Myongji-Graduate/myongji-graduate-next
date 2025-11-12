'use client';

import { API_PATH } from '../../api-path';
import { RecommendLectureData } from './recommend-lecture.type';
import { getToken } from '@/app/business/services/auth';
import fetchAX from 'fetch-ax';

export const fetchRecommendLecture = async () => {
  const token = await getToken();
  const response = await fetchAX.get<RecommendLectureData>(API_PATH.recommendLecture, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
