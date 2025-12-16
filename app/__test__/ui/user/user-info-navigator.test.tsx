import '@testing-library/jest-dom';
import UserInfoNavigator from '@/app/ui/user/user-info-navigator/user-info-navigator';
import { render, screen } from '@testing-library/react';

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({
      value: 'fake-access-token',
    }),
  }),
}));

describe('UserInfoNavigator', () => {
  it('UserInfoNavigator를 렌더링한다.', async () => {
    render(await UserInfoNavigator({ variant: 'small' }));

    expect(await screen.findByText(/장진욱/i)).toBeInTheDocument();
    expect(await screen.findByText(/디지털콘텐츠디자인학과/i)).toBeInTheDocument();
    expect(await screen.findByText(/60181666/i)).toBeInTheDocument();
    // expect(await screen.findByText(/디지털콘텐츠디자인학과/i)).toBeInTheDocument();
  });
});
