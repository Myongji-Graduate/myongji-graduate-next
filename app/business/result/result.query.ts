import { LectureInfo } from '@/app/type/lecture';
import { API_PATH } from '../api-path';

export interface ResultCategoryDetailLectures {
  categoryName: string;
  totalCredits: number;
  takenCredits: number;
  takenLectures: LectureInfo[];
  haveToLectures: LectureInfo[];
  completed: boolean;
}

export interface ResultCategoryDetailInfo {
  totalCredit: number;
  takenCredit: number;
  detailCategory: ResultCategoryDetailLectures[];
  completed: boolean;
}

export interface ResultUserInfo {
  studentNumber: string;
  studentName: string;
  studentCategory: 'NORMAL' | 'CHANGE_MAJOR' | 'DUAL_MAJOR' | 'SUB_MAJOR';
  major: string;
  totalCredit: number;
  takenCredit: number;
}

export const fetchResultCategoryDetailInfo = async (): Promise<ResultCategoryDetailInfo> => {
  const response = await fetch(API_PATH.resultCategoryDetailInfo);
  const data = await response.json();
  return data;
};
