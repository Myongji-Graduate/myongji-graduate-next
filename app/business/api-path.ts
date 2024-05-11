const BASE_URL = process.env.API_MOCKING === 'enable' ? 'http://localhost:9090' : '';

export const API_PATH = {
  revenue: `${BASE_URL}/revenue`,
  registerUserGrade: `${BASE_URL}/registerUserGrade`,
  parsePDFtoText: `${BASE_URL}/parsePDFtoText`,
  takenLectures: `${BASE_URL}/taken-lectures`,
  resultCategoryDetailInfo: `${BASE_URL}/result-category-detail-info`,
  user: `${BASE_URL}/users`,
  credits: `${BASE_URL}/credits`,
  auth: `${BASE_URL}/auth`,
  lectures: `${BASE_URL}/lectures`,
};
