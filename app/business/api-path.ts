// console.log('process.env.API_MOCKING', process.env.API_MOCKING);
const BASE_URL = 'http://staging-plzgraduation-env.eba-s4bbj5cp.ap-northeast-2.elasticbeanstalk.com/api/v1';
// process.env.API_MOCKING === 'enable'
//   ?
// : ;

console.log('BASE_URL', BASE_URL);
export const API_PATH = {
  default: BASE_URL,
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
