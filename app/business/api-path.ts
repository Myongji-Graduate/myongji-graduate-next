const BASE_URL = process.env.API_MOCKING === 'enable' ? 'http://localhost:9090' : 'https://mock.api.com';

export const API_PATH = {
  revenue: `${BASE_URL}/revenue`,
  takenLectures: `${BASE_URL}/taken-lectures`,
  user: `${BASE_URL}/users`,
};
