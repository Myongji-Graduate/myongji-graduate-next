import { SearchLecturesResponse } from '../store/querys/lecture';
import { TakenLecturesResponse } from '../business/services/lecture/taken-lecture.query';
import { CreditResponse, ResultCategoryDetailResponse } from '../store/querys/result';
import {
  SignUpRequestBody,
  SignInRequestBody,
  UserInfoResponse,
  InitUserInfoResponse,
} from '../business/services/user/user.type';
import { takenLectures, credits, searchLectures, userInfo, users, resultCategoryDetailInfo } from './data.mock';

interface MockDatabaseState {
  takenLectures: TakenLecturesResponse;
  resultCategoryDetailInfo: ResultCategoryDetailResponse;
  credits: CreditResponse[];
  users: SignUpRequestBody[];
  searchLectures: SearchLecturesResponse;
  userInfo: UserInfoResponse;
}

type MockDatabaseAction = {
  reset: () => void;
  getTakenLectures: () => TakenLecturesResponse;
  getSearchLectures: () => SearchLecturesResponse;
  addTakenLecture: (lectureId: number) => boolean;
  deleteTakenLecture: (lectureId: number) => boolean;
  createUser: (user: SignUpRequestBody) => boolean;
  signIn: (userData: SignInRequestBody) => boolean;
  deleteUser: (authId: string, password: string) => boolean;
  getCredits: () => CreditResponse[];
  getUserInfo: (authId: string) => UserInfoResponse | InitUserInfoResponse;
  getResultCategoryDetailInfo: () => ResultCategoryDetailResponse;
};

export const mockDatabase: MockDatabaseAction = {
  reset: () => {
    resetMockDB();
  },
  getTakenLectures: () => mockDatabaseStore.takenLectures,
  getSearchLectures: () => mockDatabaseStore.searchLectures,
  getResultCategoryDetailInfo: () => mockDatabaseStore.resultCategoryDetailInfo,
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
    const lecture = mockDatabaseStore.searchLectures.lectures.find((lecture) => lecture.id === lectureId);
    if (!lecture) {
      return false;
    }
    mockDatabaseStore.takenLectures.takenLectures = [
      ...mockDatabaseStore.takenLectures.takenLectures,
      {
        id: lectureId,
        year: '2023',
        semester: '2학기',
        lectureCode: lecture.lectureCode,
        lectureName: lecture.name,
        credit: lecture.credit,
      },
    ];
    return true;
  },

  getCredits: () => mockDatabaseStore.credits,
  createUser: (user: SignUpRequestBody) => {
    if (mockDatabaseStore.users.find((u) => u.authId === user.authId || u.studentNumber === user.studentNumber)) {
      return false;
    }
    mockDatabaseStore.users = [...mockDatabaseStore.users, user];
    return true;
  },
  signIn: (userData: SignInRequestBody) => {
    const user = mockDatabaseStore.users.find((u) => u.authId === userData.authId && u.password === userData.password);
    return !!user;
  },
  getUserInfo: (authId: string) => {
    const user = mockDatabaseStore.users.find((u) => u.authId === authId);
    if (!user) {
      return {
        studentNumber: '11111111',
        studentName: null,
        completeDivision: [],
        totalCredit: 0,
        takenCredit: 0,
        graduated: false,
      };
    }
    return mockDatabaseStore.userInfo;
  },
  deleteUser: (authId: string, password: string) => {
    const user = mockDatabaseStore.users.find((u) => u.authId === authId && u.password === password);
    if (user) {
      mockDatabaseStore.users = mockDatabaseStore.users.filter((u) => u.authId !== authId);
      return true;
    }
    return false;
  },
};

const initialState: MockDatabaseState = {
  takenLectures: takenLectures,
  resultCategoryDetailInfo: resultCategoryDetailInfo,
  credits: credits,
  users: users,
  searchLectures: searchLectures,
  userInfo: userInfo,
};

function initStore(): MockDatabaseState {
  return JSON.parse(JSON.stringify(initialState));
}

export let mockDatabaseStore = initStore();

export const resetMockDB = () => {
  mockDatabaseStore = initStore();
};
