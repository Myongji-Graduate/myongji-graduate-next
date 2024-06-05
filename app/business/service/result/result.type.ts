import { LectureInfo } from '@/app/type/lecture';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';

export interface ResultCategoryDetailLectures {
  categoryName: string;
  totalCredits: number;
  takenCredits: number;
  takenLectures: LectureInfo[];
  haveToLectures: LectureInfo[];
  completed: boolean;
}

export interface ResultCategoryDetailResponse {
  totalCredit: number;
  takenCredit: number;
  detailCategory: ResultCategoryDetailLectures[];
  completed: boolean;
}

export interface Major {
  majorType: 'PRIMARY' | 'DUAL' | 'SUB';
  major: string;
}

export interface CreditResponse {
  category: keyof typeof RESULT_CATEGORY;
  totalCredit: number;
  takenCredit: number;
  completed: boolean;
}
