const BASE_URL = process.env.NEXT_PUBLIC_API_MOCKING === 'enable' ? 'http://localhost:9090' : 'http://mock.api.com';

export const API_PATH = {
  revenue: `${BASE_URL}/revenue`,
};