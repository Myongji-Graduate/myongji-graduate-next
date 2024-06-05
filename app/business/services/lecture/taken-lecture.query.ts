import { API_PATH } from '../../api-path';
import { TAG } from '@/app/utils/http/tag';
import { cookies } from 'next/headers';

export interface TakenLecturesResponse {
  totalCredit: number;
  takenLectures: TakenLectrueInfoResponse[];
}

interface TakenLectrueInfoResponse {
  [index: string]: string | number;
  id: number;
  year: string;
  semester: string;
  lectureCode: string;
  lectureName: string;
  credit: number;
}

export const fetchTakenLectures = async (): Promise<TakenLecturesResponse> => {
  const response = await fetch(API_PATH.takenLectures, {
    next: { tags: [TAG.GET_TAKEN_LECTURES] },
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
  const data = await response.json();
  return data;
};
