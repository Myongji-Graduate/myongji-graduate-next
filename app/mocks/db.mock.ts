import { SearchLectures } from '../business/lecture/search-lecture.query';
import { TakenLectures } from '../business/lecture/taken-lecture.query';
import { ResultCategoryDetailInfo } from '../business/result/result.query';
import { takenLectures, resultCategoryDetailInfo, searchLectures } from './data.mock';
import { mockUserAction, type MockUserACtion } from './actions/user-action.mock';

export interface MockUser {
  authId: string;
  password: string;
  studentNumber: string;
  engLv: string;
  major: string;
  isSumbitted: boolean;
  name: string;
}

interface MockDatabaseState {
  takenLectures: TakenLectures;
  resultCategoryDetailInfo: ResultCategoryDetailInfo;
  users: MockUser[];
  searchLectures: SearchLectures;
}

type MockDatabaseAction = {
  getTakenLectures: () => TakenLectures;
  getSearchLectures: () => SearchLectures;
  getResultCategoryDetailInfo: () => ResultCategoryDetailInfo;
  addTakenLecture: (lectureId: number) => boolean;
  deleteTakenLecture: (lectureId: number) => boolean;
} & MockUserACtion;

export const mockDatabase: MockDatabaseAction = {
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
  getResultCategoryDetailInfo: () => mockDatabaseStore.resultCategoryDetailInfo,
  ...mockUserAction,
};

const initialState: MockDatabaseState = {
  takenLectures: takenLectures,
  resultCategoryDetailInfo: resultCategoryDetailInfo,
  users: [
    {
      authId: 'admin',
      password: 'admin',
      studentNumber: '60000000',
      engLv: 'ENG12',
      isSumbitted: false,
      major: '융소입니다',
      name: '모킹이',
    },
  ],
  searchLectures: searchLectures,
};

function initStore(): MockDatabaseState {
  return JSON.parse(JSON.stringify(initialState));
}

export let mockDatabaseStore = initStore();

export const resetMockDB = () => {
  mockDatabaseStore = initStore();
};
