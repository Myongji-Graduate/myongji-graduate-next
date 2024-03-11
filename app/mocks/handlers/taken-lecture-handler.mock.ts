import { HttpResponse, http } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';

export const takenLectureHandlers = [
  http.get(API_PATH.takenLectures, () => {
    const takenLectures = mockDatabase.getTakenLectures();

    return HttpResponse.json(takenLectures[0]);
  }),
];
