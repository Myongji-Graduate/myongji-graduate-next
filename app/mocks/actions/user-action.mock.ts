import { SignInRequestBody, SignUpRequestBody, UserInfoResponse } from '@/app/business/user/user.type';
import { MockUser } from '../data';
import { mockDatabaseStore } from '../data';

export interface MockUserACtion {
  getUser: (authId: string) => MockUser | undefined;
  createUser: (user: SignUpRequestBody) => boolean;
  signIn: (userData: SignInRequestBody) => boolean;
  getUserInfo: (authId: string) => UserInfoResponse;
}

export const mockUserAction: MockUserACtion = {
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
