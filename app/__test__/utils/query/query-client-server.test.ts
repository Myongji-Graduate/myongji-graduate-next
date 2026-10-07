/** @jest-environment node */
import { getQueryClient } from '@/app/utils/query/query-client';

it('never shares a query cache between server renders', () => {
  const first = getQueryClient('same-session');
  first.setQueryData(['private'], 'synthetic-a');
  const second = getQueryClient('same-session');
  expect(second).not.toBe(first);
  expect(second.getQueryData(['private'])).toBeUndefined();
  first.clear();
  second.clear();
});
