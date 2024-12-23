import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { searchWordAtom } from '../stores/search-word';
import { API_PATH } from '@/app/business/api-path';
import { getToken } from '@/app/business/services/auth';
import { LectureInfoResponse } from './result';
import fetchAX from 'fetch-ax';

export type SearchedLectureInfoResponse = LectureInfoResponse & { taken: boolean; revoked: boolean };

export const useFetchSearchLecture = () => {
  const searchWord = useAtomValue(searchWordAtom);

  return useSuspenseQuery<SearchedLectureInfoResponse[]>({
    queryKey: [QUERY_KEY.SEARCH_LECTURE, searchWord.type, searchWord.keyword],
    queryFn: () => {
      return fetchSearchLectures(searchWord.type, searchWord.keyword as string);
    },
  });
};

export const fetchSearchLectures = async (type: string, keyword: string) => {
  const token = await getToken();
  const response = await fetchAX.get<SearchedLectureInfoResponse[]>(
    `${API_PATH.lectures}?type=${type}&&keyword=${keyword}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
