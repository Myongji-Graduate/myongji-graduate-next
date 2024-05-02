import { SearchLectures } from '../business/lecture/search-lecture.query';
import { TakenLectures } from '../business/lecture/taken-lecture.query';
import { ResultCategoryDetailInfo } from '../business/result/result.query';
import { takenLectures, resultCategoryDetailInfo, searchLectures } from './data.mock';
import { mockUserAction, type MockUserACtion } from './actions/user-action.mock';
import { mockLectureAction, type MockLectureAction } from './actions/lecture-action.mock';
import { mockResultAction, type MockResultAction } from './actions/result-action.mock';

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

type MockDatabaseAction = MockUserACtion & MockLectureAction & MockResultAction;

export const mockDatabase: MockDatabaseAction = {
  ...mockUserAction,
  ...mockLectureAction,
  ...mockResultAction,
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
