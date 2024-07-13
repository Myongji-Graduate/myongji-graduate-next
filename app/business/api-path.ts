const BASE_URL = 'http://localhost:9090';
process.env.API_MOCKING === 'enable' ? 'http://localhost:9090' : '';

export const API_PATH = {
  default: BASE_URL,
  revenue: `${BASE_URL}/revenue`,
  registerUserGrade: `${BASE_URL}/parsing-text`,
  parsePDFtoText: `${BASE_URL}/parsePDFtoText`,
  takenLectures: `${BASE_URL}/taken-lectures`,
  user: `${BASE_URL}/users`,
  graduations: `${BASE_URL}/graduations`,
  auth: `${BASE_URL}/auth`,
  lectures: `${BASE_URL}/lectures`,
};
