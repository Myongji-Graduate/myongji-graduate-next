const BASE_URL = process.env.API_MOCKING === 'enable' ? 'http://localhost:9090' : 'https://mock.api.com';

export const API_PATH = {
  revenue: `${BASE_URL}/revenue`,
  registerUserGrade: `${BASE_URL}/registerUserGrade`,
  parsePDFtoText: `${BASE_URL}/parsePDFtoText`,
  takenLectures: `${BASE_URL}/taken-lectures`,
  user: `${BASE_URL}/users`,
};
