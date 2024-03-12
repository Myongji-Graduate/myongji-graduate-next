const BASE_URL = process.env.API_MOCKING === 'enable' ? 'http://localhost:9090' : 'http://mock.api.com';

export const API_PATH = {
  revenue: `${BASE_URL}/revenue`,
  registUserGrade: `${BASE_URL}/registUserGrade`,
  parsePDFtoText: `${BASE_URL}/parsePDFtoText`,
  takenLectures: `${BASE_URL}/taken-lectures`,
};
