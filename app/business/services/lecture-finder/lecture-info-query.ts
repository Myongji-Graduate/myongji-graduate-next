import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { fetchFindeLectureInfo } from './lecture-info.command';

export const useFetchFindeLectureInfo = (subject: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LECTURES_INFO, subject],
    queryFn: () => fetchFindeLectureInfo({ subject }),
  });
};
