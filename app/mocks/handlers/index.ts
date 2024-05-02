import { resultHandlers } from './result-handler.mock';
import { lectureHandlers } from './lecture-handler.mock';
import { userHandlers } from './user-handler.mock';

export const handlers = [...userHandlers, ...lectureHandlers, ...resultHandlers];
