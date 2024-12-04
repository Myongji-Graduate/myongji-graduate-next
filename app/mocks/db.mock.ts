import { TakenLecturesResponse } from '../business/services/lecture/taken-lecture.query';
import { CreditResponse, ResultCategoryDetailResponse } from '../store/querys/result';
import {
  SignUpRequestBody,
  SignInRequestBody,
  UserInfoResponse,
  InitUserInfoResponse,
  FindIdResponse,
  FindIdFormSchema,
  FindPasswordFormSchema,
} from '../business/services/user/user.type';
import { takenLectures, credits, searchLectures, userInfo, users, resultCategoryDetailInfo } from './data.mock';
import { SearchedLectureInfoResponse } from '../store/querys/lecture';

interface MockDatabaseState {
  takenLectures: TakenLecturesResponse;
  resultCategoryDetailInfo: ResultCategoryDetailResponse;
  credits: CreditResponse[];
  users: SignUpRequestBody[];
  searchLectures: SearchedLectureInfoResponse[];
  userInfo: UserInfoResponse;
  // findPassword:FindPasswordResponse;
}

type MockDatabaseAction = {
  reset: () => void;
  getTakenLectures: () => TakenLecturesResponse;
  getSearchLectures: () => SearchedLectureInfoResponse[];
  addTakenLecture: (lectureId: string) => boolean;
  deleteTakenLecture: (lectureId: number) => boolean;
  createUser: (user: SignUpRequestBody) => boolean;
  signIn: (userData: SignInRequestBody) => boolean;
  deleteUser: (authId: string, password: string) => boolean;
  getCredits: () => CreditResponse[];
  getFindId: (form: FindIdFormSchema) => FindIdResponse;
  getUserInfo: (authId: string) => UserInfoResponse | InitUserInfoResponse;
  getResultCategoryDetailInfo: () => ResultCategoryDetailResponse;
  resetPassword: (request: FindPasswordFormSchema) => boolean;
  validateUser: (userInfo: FindIdResponse) => { passedUserValidation: boolean };
};

export const mockDatabase: MockDatabaseAction = {
  reset: () => {
    resetMockDB();
  },
  validateUser: (userInfo: FindIdResponse) => {
    const user = mockDatabaseStore.users.find(
      (u) => u.authId === userInfo.authId && u.studentNumber === userInfo.studentNumber,
    );
    return { passedUserValidation: !!user };
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
    const lecture = mockDatabaseStore.searchLectures.find((lecture) => lecture.id === lectureId);
    if (!lecture) {
      return false;
    }
    mockDatabaseStore.takenLectures.takenLectures = [
      ...mockDatabaseStore.takenLectures.takenLectures,
      {
        id: 141,
        lectureCode: 'KMA02106',
        year: '2023',
        semester: '2학기',
        lectureName: lecture.name,
        credit: lecture.credit,
      },
    ];
    return true;
  },
  getFindId: (form: FindIdFormSchema) => {
    const user = mockDatabaseStore.users.find((u) => u.studentNumber === form.studentNumber);
    return { studentNumber: user?.studentNumber ?? '', authId: user?.authId ?? '' };
  },
  resetPassword: () => true,
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
