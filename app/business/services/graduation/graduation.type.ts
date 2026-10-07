import type { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';

export interface LectureInfoResponse {
  [index: string]: string | number | boolean;
  id: string;
  name: string;
  credit: number;
}

export interface ResultCategoryDetailLecturesResponse {
  categoryName: string;
  totalCredit: number;
  takenCredit: number;
  takenLectures: LectureInfoResponse[];
  haveToLectures: LectureInfoResponse[];
  mandatoryLectures?: LectureInfoResponse[];
  mandatoryOptions?: MandatoryOptionResponse[];
  completed: boolean;
}

export interface MandatoryOptionResponse {
  name: string;
  requiredCount: number;
  takenCount: number;
  candidates: LectureInfoResponse[];
}

export interface ResultCategoryDetailResponse {
  totalCredit: number;
  takenCredit: number;
  detailCategory: ResultCategoryDetailLecturesResponse[];
  completed?: boolean;
}

export interface CreditResponse {
  category: keyof typeof RESULT_CATEGORY;
  totalCredit: number;
  takenCredit: number;
  completed: boolean;
}
