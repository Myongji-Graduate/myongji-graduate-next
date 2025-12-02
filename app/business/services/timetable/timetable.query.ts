'use client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { TimetableLectureRow } from '@/app/business/services/timetable/timetable.type';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { CURRENT_YEAR, CURRENT_SEMESTER } from '@/app/business/services/timetable/constants';
import { deleteTimetable, uploadTimetable, fetchTimetable } from './timetable.command';

/** 시간표 조회 */
export const useFetchTimetable = () =>
  useQuery<TimetableLectureRow[]>({
    queryKey: [QUERY_KEY.TIMETABLE],
    queryFn: async () => fetchTimetable({ year: CURRENT_YEAR, semester: CURRENT_SEMESTER }),
  });

/** 시간표 업로드 */
export const usePostTimetable = (lecturesIds: number[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => uploadTimetable({ year: CURRENT_YEAR, semester: CURRENT_SEMESTER, lecturesIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TIMETABLE] });
    },
  });
};

/** 시간표 삭제 */
export const useDeleteTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => deleteTimetable({ year: CURRENT_YEAR, semester: CURRENT_SEMESTER }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TIMETABLE] }),
  });
};
