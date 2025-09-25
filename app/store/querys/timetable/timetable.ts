import { API_PATH } from '@/app/business/api-path';
import { getToken } from '@/app/business/services/auth';
import { TimetableLectureRow } from '@/app/type/timetable/types';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '@/app/utils/timetable/constants';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import fetchAX from 'fetch-ax';

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

export const uploadTimetable = async (year: number, semester: number, lecturesIds: number[]) => {
  const token = await getToken();
  const response = await fetchAX.post(
    `${API_PATH.timetable}/my/replace`,
    { year, semester, timetableIds: lecturesIds },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
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

export const fetchTimetable = async (year: number, semester: number) => {
  const token = await getToken();
  const response = await fetchAX.get(`${API_PATH.timetable}/my?year=${year}&semester=${semester}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
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

export const deleteTimetable = async (year: number, semester: number) => {
  const token = await getToken();
  const response = await fetchAX.post(
    `${API_PATH.timetable}/my/delete`,
    { year, semester },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
