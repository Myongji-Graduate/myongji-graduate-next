import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { searchWordAtom } from '../stores/search-word';
import axios from 'axios';
import { API_PATH } from '@/app/business/api-path';
import { getToken } from '@/app/business/services/auth';
import { LectureInfoResponse } from './result';

export type SearchedLectureInfoResponse = LectureInfoResponse & { isTaken: boolean };

export const useFetchSearchLecture = () => {
  const searchWord = useAtomValue(searchWordAtom);

  return useSuspenseQuery<SearchedLectureInfoResponse[]>({
    queryKey: [QUERY_KEY.SEARCH_LECTURE],
    queryFn: () => {
      return fetchSearchLectures(searchWord.type, searchWord.keyword as string);
    },
  });
};

export interface SearchLecturesResponse {
  lectures: SearchedLectureInfoResponse[];
}

export const fetchSearchLectures = async (type: string, keyword: string) => {
  const response = await axios<SearchLecturesResponse>(`${API_PATH.lectures}?type=${type}&&keyword=${keyword}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data.lectures;
};
