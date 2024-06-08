import { useAtomValue } from 'jotai';
import { searchWordAtom } from '@/app/store/search-word';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchSearchLectures } from '@/app/business/lecture/search-lecture.query';
import List from '@/app/ui/view/molecule/list';
import Grid from '@/app/ui/view/molecule/grid';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import AddTakenLectureButton from '../taken-lecture/add-taken-lecture-button';
import { SearchLectures } from '@/app/type/lecture';

export default function LectureSearchResult() {
  const searchWord = useAtomValue(searchWordAtom);

  const { data } = useSuspenseQuery<SearchLectures[]>({
    queryKey: [QUERY_KEY.SEARCH_LECTURE],
    queryFn: () => {
      return fetchSearchLectures(searchWord.type, searchWord.keyword as string);
    },
  });

  const renderAddActionButton = (item: SearchLectures, taken: boolean) => {
    return <AddTakenLectureButton lectureItem={item} taken={taken} />;
  };

  const render = (item: SearchLectures, index: number) => {
    const searchLectureItem = item;
    return (
      <List.Row data-cy={`lecture-${searchLectureItem.name}`} key={index} textColor={item.revoked ? 'gray' : 'black'}>
        <Grid cols={4}>
          {Object.keys(searchLectureItem).map((key, index) => {
            if (key === 'id' || key === 'taken' || key === 'revoked') return null;
            return <Grid.Column key={index}>{searchLectureItem[key]}</Grid.Column>;
          })}
          {renderAddActionButton ? (
            <Grid.Column>{renderAddActionButton(searchLectureItem, item.taken)}</Grid.Column>
          ) : null}
        </Grid>
      </List.Row>
    );
  };

  return <List data={data} render={render} isScrollList={true} />;
}
