import { instance } from '@/app/utils/api/instance';
import { API_PATH } from '../../api-path';
import { TAG } from '@/app/utils/http/tag';

export interface TakenLecturesResponse {
  totalCredit: number;
  takenLectures: TakenLectureInfoResponse[];
}

export interface TakenLectureInfoResponse {
  [index: string]: string | number;
  id: number;
  year: string;
  semester: string;
  lectureCode: string;
  lectureName: string;
  credit: number;
}

export const fetchTakenLectures = async () => {
  const response = await instance.get<TakenLecturesResponse>(API_PATH.takenLectures, {
    next: {
      tags: [TAG.GET_TAKEN_LECTURES],
    },
  });
  return response.data;
};
