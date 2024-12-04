import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';
import { parsePDF } from '../data.mock';

export const takenLectureHandlers = [
  http.get(API_PATH.takenLectures, async () => {
    const takenLectures = mockDatabase.getTakenLectures();
    await delay(1000);
    return HttpResponse.json(takenLectures);
  }),
  http.get(API_PATH.lectures, async () => {
    const takenLectures = mockDatabase.getSearchLectures();
    await delay(100);
    return HttpResponse.json(takenLectures);
  }),
  http.post<never, { lectureCode: string }>(API_PATH.takenLectures, async ({ request }) => {
    const body = await request.json();
    const isAdded = mockDatabase.addTakenLecture(body.lectureCode);
    await delay(1000);
    if (isAdded) return HttpResponse.json({ message: '과목 추가에 성공했습니다' }, { status: 200 });
    return HttpResponse.json({ errorCode: 400, message: '추가에 실패했습니다' }, { status: 400 });
  }),
  http.delete<never, { lectureId: number }>(`${API_PATH.takenLectures}/:id`, async ({ request }) => {
    const url = new URL(request.url);
    // url.pathname.split("/") 의 결과 : ['','taken-lectures',120]
    const lectureId = Number(url.pathname.split('/')[2]);
    const isDeleted = mockDatabase.deleteTakenLecture(lectureId);
    await delay(1000);
    if (isDeleted) {
      return HttpResponse.json({ message: '삭제되었습니다' }, { status: 200 });
    }
    return HttpResponse.json({ errorCode: 400, message: '삭제에 실패했습니다' }, { status: 400 });
  }),
  http.post(API_PATH.parsePDFtoText, async () => {
    await delay(1000);
    return HttpResponse.json(parsePDF);
  }),

  http.post(API_PATH.registerUserGrade, async () => {
    await delay(1000);
    throw new HttpResponse(null, { status: 200 });
  }),
];
