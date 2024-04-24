import { LectureInfo } from '@/app/type/lecture';
import { API_PATH } from '../api-path';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';

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

export const fetchResultCategoryDetailInfo = async (category: string): Promise<ResultCategoryDetailInfo> => {
  //category를 querystring으로 호출하는 건은 mock단계에서는 불필요할 것으로 예상, 실제 api 연결시 변경 예정
  try {
    const response = await fetch(API_PATH.resultCategoryDetailInfo);
    const result = await response.json();

    httpErrorHandler(response, result);
    return result;
  } catch (error) {
    throw error;
  }
};
