export interface TakenLectrueInfo {
  [index: string]: string | number;
  id: number;
  year: string;
  semester: string;
  lectureCode: string;
  lectureName: string;
  credit: number;
}
export interface LectureInfo {
  [index: string]: string | number | boolean;
  id: number;
  lectureCode: string;
  name: string;
  credit: number;
}

export type SearchLectures = LectureInfo & { isTaken: boolean; isRevoked: boolean };

export type LectureSearchParams = {
  type?: string;
  keyword?: string;
};
