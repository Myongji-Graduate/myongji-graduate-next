import { cookies } from 'next/headers';
import { auth } from '@/app/business/services/user/user.query';
import { instance } from '@/app/utils/api/instance';

jest.mock('next/headers', () => ({ cookies: jest.fn() }));

describe('guest authentication', () => {
  it('does not request user data when there is no access token', async () => {
    jest
      .mocked(cookies)
      .mockReturnValue({ get: jest.fn().mockReturnValue(undefined) } as unknown as ReturnType<typeof cookies>);
    const request = jest.spyOn(instance, 'get');

    try {
      await expect(auth()).resolves.toBeUndefined();
      expect(request).not.toHaveBeenCalled();
    } finally {
      request.mockRestore();
    }
  });
});
