'use client';

import { TimetableLectureRow } from '@/app/type/timetable/types';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '@/app/utils/timetable/constants';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { deleteTimetable, fetchTimetable, uploadTimetable } from './timetable.command';

/**시간표 업로드 */
interface usePostTimetableProps {
  lecturesIds: number[];
}

export const usePostTimetable = ({ lecturesIds }: usePostTimetableProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => uploadTimetable(CURRENT_YEAR, CURRENT_SEMESTER, lecturesIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FETCH_TIMETABLE] });
    },
  });
};

/**시간표 fetch */
export const useFetchTimetable = () => {
  return useSuspenseQuery<TimetableLectureRow[]>({
    queryKey: [QUERY_KEY.FETCH_TIMETABLE],
    queryFn: () => {
      return fetchTimetable(CURRENT_YEAR, CURRENT_SEMESTER);
    },
  });
};

/** 시간표 삭제 */
export const useDeleteTimetable = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTimetable(CURRENT_YEAR, CURRENT_SEMESTER),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FETCH_TIMETABLE] });
    },
  });
};
