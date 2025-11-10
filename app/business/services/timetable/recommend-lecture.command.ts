import { instance } from '@/app/utils/api/instance';
import { API_PATH } from '../../api-path';
import { RecommendLectureData } from './recommend-lecture.type';

export const fetchRecommendLecture = async () => {
  const response = await instance.get<RecommendLectureData>(API_PATH.recommendLecture);
  return response.data;
};
