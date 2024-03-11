import { TakenLectures } from '../business/lecture/taken-lecture.query';
import { takenLectures } from './data.mock';

interface MockUser {
  authId: string;
  password: string;
  studentNumber: string;
  engLv: string;
  major?: string;
}

interface MockDatabaseState {
  takenLectures: TakenLectures[];
  users: MockUser[];
}

type MockDatabaseAction = {
  getTakenLectures: () => TakenLectures[];
  getUser: (authId: string) => MockUser | undefined;
  createUser: (user: MockUser) => void;
};

export const mockDatabase: MockDatabaseAction = {
  getTakenLectures: () => mockDatabaseStore.takenLectures,
  getUser: (authId: string) => mockDatabaseStore.users.find((user) => user.authId === authId),
  createUser: (user: MockUser) => {
    mockDatabaseStore.users.push(user);
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
