'use client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { TimetableLectureRow } from '@/app/type/timetable/types';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';

/** 시간표 조회 */
export const useFetchTimetable = () =>
  useSuspenseQuery<TimetableLectureRow[]>({
    queryKey: [QUERY_KEY.TIMETABLE],
    queryFn: async () => (await fetch('/api/timetable/my')).json(),
  });

/** 시간표 업로드 */
export const usePostTimetable = (lecturesIds: number[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      (
        await fetch('/api/timetable/my/replace', {
          method: 'POST',
          body: JSON.stringify({ lecturesIds }),
        })
      ).json(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TIMETABLE] }),
  });
};

/** 시간표 삭제 */
export const useDeleteTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => (await fetch('/api/timetable/my', { method: 'DELETE' })).json(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TIMETABLE] }),
  });
};
