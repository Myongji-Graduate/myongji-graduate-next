import { setupURL } from '../utils/api/setup-url.util';

const { BASE_URL, PARSE_API_URL } = setupURL();

export const API_PATH = {
  default: BASE_URL,
  revenue: `${BASE_URL}/revenue`,
  registerUserGrade: `${BASE_URL}/parsing-text`,
  parsePDFtoText: PARSE_API_URL,
  takenLectures: `${BASE_URL}/taken-lectures`,
  user: `${BASE_URL}/users`,
  graduations: `${BASE_URL}/graduations`,
  auth: `${BASE_URL}/auth`,
  lectures: `${BASE_URL}/lectures`,
  timetableLectures: `${BASE_URL}/timetable`,
};
