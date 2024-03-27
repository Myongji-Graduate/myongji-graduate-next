import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';
import { parsePDF } from '../data.mock';

export const takenLectureHandlers = [
  http.get(API_PATH.takenLectures, () => {
    const takenLectures = mockDatabase.getTakenLectures();

    return HttpResponse.json(takenLectures[0]);
  }),
  http.post(API_PATH.parsePDFtoText, async () => {
    await delay(1000);
    console.log(parsePDF);
    return HttpResponse.json(parsePDF);
  }),

  http.post(API_PATH.registerUserGrade, async () => {
    await delay(1000);
    throw new HttpResponse(null, { status: 200 });
  }),
];
