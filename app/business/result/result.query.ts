import { LectureInfo } from '@/app/type/lecture';
import { API_PATH } from '../api-path';
import { cookies } from 'next/headers';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';

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

export interface Major {
  majorType: 'PRIMARY' | 'DUAL' | 'SUB';
  major: string;
}

export interface ResultUserInfo {
  studentNumber: string;
  studentName: string;
  completionDivision: Major[];
  totalCredit: number;
  takenCredit: number;
  graduated: boolean;
}

export interface Credit {
  category: keyof typeof RESULT_CATEGORY;
  totalCredit: number;
  takenCredit: number;
  completed: boolean;
}
export const fetchResultCategoryDetailInfo = async (category: string): Promise<ResultCategoryDetailInfo> => {
  //FIX : category를 querystring으로 호출하는 건은 mock단계에서는 불필요할 것으로 예상, 실제 api 연결시 변경 예정
  try {
    const response = await fetch(API_PATH.resultCategoryDetailInfo, {
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    const result = await response.json();
    httpErrorHandler(response, result);

    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchCredits = async (): Promise<Credit[]> => {
  try {
    const response = await fetch(API_PATH.credits, {
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    const result = await response.json();

    httpErrorHandler(response, result);

    return result;
  } catch (error) {
    throw error;
  }
};
