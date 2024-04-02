import { TakenLectures } from '../business/lecture/taken-lecture.query';
import { SignUpRequestBody, SignInRequestBody } from '../business/user/user.type';
import { takenLectures } from './data.mock';

interface MockUser {
  authId: string;
  password: string;
  studentNumber: string;
  engLv: string;
  major?: string;
}

interface MockDatabaseState {
  takenLectures: TakenLectures;
  users: MockUser[];
}

type MockDatabaseAction = {
  getTakenLectures: () => TakenLectures;
  deleteTakenLecture: (lectureId: number) => boolean;
  getUser: (authId: string) => MockUser | undefined;
  createUser: (user: MockUser) => boolean;
  signIn: (userData: SignInRequestBody) => boolean;
};

export const mockDatabase: MockDatabaseAction = {
  getTakenLectures: () => mockDatabaseStore.takenLectures,
  deleteTakenLecture: (lectureId: number) => {
    if (mockDatabaseStore.takenLectures.takenLectures.find((lecture) => lecture.id === lectureId)) {
      mockDatabaseStore.takenLectures.takenLectures = mockDatabaseStore.takenLectures.takenLectures.filter(
        (lecture) => lecture.id !== lectureId,
      );
      return true;
    }
    return false;
  },
  getUser: (authId: string) => mockDatabaseStore.users.find((user) => user.authId === authId),
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
};

const initialState: MockDatabaseState = {
  takenLectures: takenLectures,
  users: [
    {
      authId: 'admin',
      password: 'admin',
      studentNumber: '60000000',
      engLv: 'ENG12',
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
