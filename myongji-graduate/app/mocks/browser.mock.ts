import { setupWorker } from 'msw/browser';
import { handlers } from './handlers.mock';

export const worker = setupWorker(...handlers);
