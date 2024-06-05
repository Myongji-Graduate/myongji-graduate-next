import { SearchedLectureInfo } from '@/app/type/lecture';
import { useAtomValue } from 'jotai';
import { searchWordAtom } from '@/app/store/stores/search-word';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchSearchLectures } from '@/app/business/lecture/search-lecture.query';
import List from '@/app/ui/view/molecule/list';
import Grid from '@/app/ui/view/molecule/grid';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import AddTakenLectureButton from '../taken-lecture/add-taken-lecture-button';

export default function LectureSearchResult() {
  const searchWord = useAtomValue(searchWordAtom);

  const { data } = useSuspenseQuery<SearchedLectureInfo[]>({
    queryKey: [QUERY_KEY.SEARCH_LECTURE],
    queryFn: () => {
      return fetchSearchLectures(searchWord.type, searchWord.keyword as string);
    },
  });

  const renderAddActionButton = (item: SearchedLectureInfo, isTaken: boolean) => {
    return <AddTakenLectureButton lectureItem={item} isTaken={isTaken} />;
  };

  const render = (item: SearchedLectureInfo, index: number) => {
    const searchLectureItem = item;
    return (
      <List.Row data-cy={`lecture-${searchLectureItem.name}`} key={index}>
        <Grid cols={4}>
          {Object.keys(searchLectureItem).map((key, index) => {
            if (key === 'id' || key === 'isTaken') return null;
            return <Grid.Column key={index}>{searchLectureItem[key]}</Grid.Column>;
          })}
          {renderAddActionButton ? (
            <Grid.Column>{renderAddActionButton(searchLectureItem, item.isTaken)}</Grid.Column>
          ) : null}
        </Grid>
      </List.Row>
    );
  };

  return <List data={data} render={render} isScrollList={true} />;
}
