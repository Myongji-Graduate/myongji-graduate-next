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
    render(await UserInfoNavigator());

    expect(await screen.findByText(/모킹이/i)).toBeInTheDocument();
    expect(await screen.findByText(/융합소프트웨어/i)).toBeInTheDocument();
    expect(await screen.findByText(/60000000/i)).toBeInTheDocument();
  });
});
