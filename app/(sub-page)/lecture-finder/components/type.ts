export interface Review {
  author: string;
  content: string;
  rating: number;
}

export interface Lecture {
  id?: number;
  professor: string;
  assignment: string;
  grading: string;
  attendance: string;
  exam: string;
  rating: number | string | null;
  reviews: Review[];
  lectureName?: string;
  enrollmentCount?: number;
  completionType?: string;
}

export interface LectureData {
  courseName: string;
  averageRating: number;
  courseId: number;
  lectures: Lecture[];
}
