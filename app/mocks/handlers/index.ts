import { takenLectureHandlers } from './taken-lecture-handler.mock';
import { userHandlers } from './user-handler.mock';

export const handlers = [...userHandlers, ...takenLectureHandlers];
