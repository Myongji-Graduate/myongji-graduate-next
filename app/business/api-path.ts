const BASE_URL = 'http://staging-plzgraduation-env.eba-s4bbj5cp.ap-northeast-2.elasticbeanstalk.com/api/v1';

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
