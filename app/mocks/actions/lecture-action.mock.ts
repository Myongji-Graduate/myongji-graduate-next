import { SearchLectures } from '@/app/business/lecture/search-lecture.query';
import { TakenLectures } from '@/app/business/lecture/taken-lecture.query';
import { mockDatabaseStore } from '../db.mock';

export interface MockLectureAction {
  getTakenLectures: () => TakenLectures;
  getSearchLectures: () => SearchLectures;
  addTakenLecture: (lectureId: number) => boolean;
  deleteTakenLecture: (lectureId: number) => boolean;
}

export const mockLectureAction: MockLectureAction = {
  getTakenLectures: () => mockDatabaseStore.takenLectures,
  getSearchLectures: () => mockDatabaseStore.searchLectures,
  deleteTakenLecture: (lectureId) => {
    if (mockDatabaseStore.takenLectures.takenLectures.find((lecture) => lecture.id === lectureId)) {
      mockDatabaseStore.takenLectures.takenLectures = mockDatabaseStore.takenLectures.takenLectures.filter(
        (lecture) => lecture.id !== lectureId,
      );
      return true;
    }
    return false;
  },
  addTakenLecture: (lectureId) => {
    mockDatabaseStore.takenLectures.takenLectures = [
      ...mockDatabaseStore.takenLectures.takenLectures,
      {
        id: lectureId,
        year: '2023',
        semester: '2학기',
        lectureCode: 'HECD140',
        lectureName: '추가한과목',
        credit: 3,
      },
    ];
    return true;
  },
};
