import { takenLectures, resultCategoryDetailInfo, searchLectures } from './data.mock';
import { SearchLectures } from '@/app/business/lecture/search-lecture.query';
import { TakenLectures } from '@/app/business/lecture/taken-lecture.query';
import { ResultCategoryDetailInfo } from '@/app/business/result/result.query';

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
