import { fetchSearchLectures } from '@/app/business/services/lecture/search-lecture.query';
import { SearchedLectureInfo } from '@/app/type/lecture';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { searchWordAtom } from '../stores/search-word';

export const useFetchSearchLecture = () => {
  const searchWord = useAtomValue(searchWordAtom);

  return useSuspenseQuery<SearchedLectureInfo[]>({
    queryKey: [QUERY_KEY.SEARCH_LECTURE],
    queryFn: () => {
      return fetchSearchLectures(searchWord.type, searchWord.keyword as string);
    },
  });
};
