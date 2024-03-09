const BASE_URL = process.env.API_MOCKING === 'enable' ? 'http://localhost:9090' : 'http://mock.api.com';

export const API_PATH = {
  revenue: `${BASE_URL}/revenue`,
  uploadFile: `${BASE_URL}/uploadFile`,
  parsePDF: `${BASE_URL}/parsePDF`,
  takenLectures: `${BASE_URL}/taken-lectures`,
};
