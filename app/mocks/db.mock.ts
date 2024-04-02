import { TakenLectures } from '../business/lecture/taken-lecture.query';
import { SignUpRequestBody, SignInRequestBody, UserInfoResponse } from '../business/user/user.type';
import { takenLectures } from './data.mock';

interface MockUser {
  authId: string;
  password: string;
  studentNumber: string;
  engLv: string;
  major: string;
  isSumbitted: boolean;
  name: string;
}

interface MockDatabaseState {
  takenLectures: TakenLectures[];
  users: MockUser[];
}

type MockDatabaseAction = {
  getTakenLectures: () => TakenLectures[];
  getUser: (authId: string) => MockUser | undefined;
  createUser: (user: SignUpRequestBody) => boolean;
  signIn: (userData: SignInRequestBody) => boolean;
  getUserInfo: (authId: string) => UserInfoResponse;
};

export const mockDatabase: MockDatabaseAction = {
  getTakenLectures: () => mockDatabaseStore.takenLectures,
  getUser: (authId: string) => mockDatabaseStore.users.find((user) => user.authId === authId),
  createUser: (user: SignUpRequestBody) => {
    if (mockDatabaseStore.users.find((u) => u.authId === user.authId || u.studentNumber === user.studentNumber)) {
      return false;
    }
    mockDatabaseStore.users = [
      ...mockDatabaseStore.users,
      {
        ...user,
        isSumbitted: false,
        major: '융소입니다',
        name: '모킹이2',
      },
    ];
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
        studentNumber: '',
        studentName: '',
        major: '',
        isSumbitted: false,
      };
    }
    return {
      studentNumber: user.studentNumber,
      studentName: user.name,
      major: user.major,
      isSumbitted: user.isSumbitted,
    };
  },
};

const initialState: MockDatabaseState = {
  takenLectures: [takenLectures],
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
};

function initStore(): MockDatabaseState {
  return JSON.parse(JSON.stringify(initialState));
}

export let mockDatabaseStore = initStore();

export const resetMockDB = () => {
  mockDatabaseStore = initStore();
};
