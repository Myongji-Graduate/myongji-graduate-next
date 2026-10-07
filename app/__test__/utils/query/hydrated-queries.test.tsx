import { QueryClient, QueryClientProvider, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import {
  useFetchTimetable,
  usePostTimetable,
  useDeleteTimetable,
} from '@/app/business/services/timetable/timetable.query';
import { fetchTimetable, uploadTimetable, deleteTimetable } from '@/app/business/services/timetable/timetable.command';
import { useFetchCredits, useFetchResultCategoryDetailInfo } from '@/app/store/querys/result';
import { fetchCredits, fetchResultCategoryDetailInfo } from '@/app/business/services/user/user.query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import type { PropsWithChildren } from 'react';

jest.mock('../../../business/services/timetable/timetable.command', () => ({
  fetchTimetable: jest.fn(),
  uploadTimetable: jest.fn(),
  deleteTimetable: jest.fn(),
}));
jest.mock('../../../business/services/user/user.query', () => ({
  fetchCredits: jest.fn(),
  fetchResultCategoryDetailInfo: jest.fn(),
}));

function hydrate(queries: { key: string; data: unknown }[]) {
  const server = new QueryClient();
  queries.forEach(({ key, data }) => server.setQueryData<unknown>([key], data));
  const state = dehydrate(server);
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
  return { client, server, wrapper };
}

beforeEach(() => jest.clearAllMocks());

it('uses server credits and selected detail without fetching again on mount', async () => {
  const credits = [{ category: 'PRIMARY_MANDATORY_MAJOR' as const, totalCredit: 30, takenCredit: 3, completed: false }];
  const detail = { totalCredit: 30, takenCredit: 3, detailCategory: [] };
  const { client, server, wrapper } = hydrate([
    { key: QUERY_KEY.CREDIT, data: credits },
    { key: `${QUERY_KEY.CATEGORY}/PRIMARY_MANDATORY_MAJOR`, data: detail },
  ]);
  jest.mocked(fetchCredits).mockResolvedValue([{ ...credits[0], takenCredit: 6 }]);
  jest.mocked(fetchResultCategoryDetailInfo).mockResolvedValue({ ...detail, takenCredit: 6 });
  const { result, unmount } = renderHook(
    () => ({
      credits: useFetchCredits(),
      detail: useFetchResultCategoryDetailInfo('PRIMARY_MANDATORY_MAJOR'),
    }),
    { wrapper },
  );
  expect(result.current.credits.data[0].takenCredit).toBe(3);
  expect(result.current.detail.data.takenCredit).toBe(3);
  expect(fetchCredits).not.toHaveBeenCalled();
  expect(fetchResultCategoryDetailInfo).not.toHaveBeenCalled();
  await act(async () => {
    await client.invalidateQueries();
  });
  await waitFor(() => expect(result.current.credits.data[0].takenCredit).toBe(6));
  expect(result.current.detail.data.takenCredit).toBe(6);
  expect(fetchCredits).toHaveBeenCalledTimes(1);
  expect(fetchResultCategoryDetailInfo).toHaveBeenCalledTimes(1);
  unmount();
  client.clear();
  server.clear();
});

it.each(['upload', 'delete'] as const)('keeps hydrated timetable fresh, then refreshes after %s', async (operation) => {
  const { client, server, wrapper } = hydrate([{ key: QUERY_KEY.TIMETABLE, data: [] }]);
  jest.mocked(fetchTimetable).mockResolvedValue([]);
  jest.mocked(uploadTimetable).mockResolvedValue(undefined);
  jest.mocked(deleteTimetable).mockResolvedValue(undefined);
  const { result, unmount } = renderHook(
    () => ({
      timetable: useFetchTimetable(),
      upload: usePostTimetable([1]),
      remove: useDeleteTimetable(),
    }),
    { wrapper },
  );
  expect(result.current.timetable.data).toEqual([]);
  expect(fetchTimetable).not.toHaveBeenCalled();
  await act(async () => {
    await (operation === 'upload' ? result.current.upload : result.current.remove).mutateAsync();
  });
  await waitFor(() => expect(fetchTimetable).toHaveBeenCalledTimes(1));
  expect(operation === 'upload' ? uploadTimetable : deleteTimetable).toHaveBeenCalledTimes(1);
  unmount();
  client.clear();
  server.clear();
});
