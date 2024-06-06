import { mockDatabase } from '../db.mock';
import { resultHandlers } from './result-handler.mock';
import { takenLectureHandlers } from './taken-lecture-handler.mock';
import { userHandlers } from './user-handler.mock';
import { API_PATH } from '@/app/business/api-path';
import { http, HttpResponse } from 'msw';

const defaultHandlers = [
  http.get<never, never, never>(`${API_PATH.default}/reset`, async () => {
    console.log('reset');
    console.log('reset');
    mockDatabase.reset();
    return HttpResponse.json({ status: 200 });
  }),
];

export const handlers = [...defaultHandlers, ...userHandlers, ...takenLectureHandlers, ...resultHandlers];
