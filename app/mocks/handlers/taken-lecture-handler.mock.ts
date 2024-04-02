import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';
import { parsePDF } from '../data.mock';

export const takenLectureHandlers = [
  http.get(API_PATH.takenLectures, async () => {
    const takenLectures = mockDatabase.getTakenLectures();
    await delay(100);
    return HttpResponse.json(takenLectures);
  }),
  http.delete<never, { lectureId: number }>(API_PATH.takenLectures, async ({ request }) => {
    const body = await request.json();
    const isDeleted = mockDatabase.deleteTakenLecture(body.lectureId);
    if (isDeleted) {
      return HttpResponse.json({ message: '삭제되었습니다' }, { status: 200 });
    }
    return HttpResponse.json({ errorCode: 400, message: '삭제에 실패했습니다' }, { status: 400 });
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
