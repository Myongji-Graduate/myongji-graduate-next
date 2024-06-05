import { TakenLectrueInfo } from '@/app/type/lecture';
import { API_PATH } from '../../api-path';
import { TAG } from '@/app/utils/http/tag';
import { cookies } from 'next/headers';

export interface TakenLectures {
  totalCredit: number;
  takenLectures: TakenLectrueInfo[];
}

export const fetchTakenLectures = async (): Promise<TakenLectures> => {
  const response = await fetch(API_PATH.takenLectures, {
    next: { tags: [TAG.GET_TAKEN_LECTURES] },
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
  const data = await response.json();
  return data;
};
