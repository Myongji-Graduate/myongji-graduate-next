import { SearchedLectureInfo } from '@/app/type/lecture';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { searchWordAtom } from '../stores/search-word';
import axios from 'axios';
import { API_PATH } from '@/app/business/api-path';
import { getToken } from '@/app/business/services/auth';

export const useFetchSearchLecture = () => {
  const searchWord = useAtomValue(searchWordAtom);

  return useSuspenseQuery<SearchedLectureInfo[]>({
    queryKey: [QUERY_KEY.SEARCH_LECTURE],
    queryFn: () => {
      return fetchSearchLectures(searchWord.type, searchWord.keyword as string);
    },
  });
};

export interface SearchLectures {
  lectures: SearchedLectureInfo[];
}
export const fetchSearchLectures = async (type: string, keyword: string) => {
  const response = await axios<SearchLectures>(`${API_PATH.lectures}?type=${type}&&keyword=${keyword}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data.lectures;
};
