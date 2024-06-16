import { SearchedLectureInfoResponse } from '@/app/store/querys/lecture';
import List from '@/app/ui/view/molecule/list';
import Grid from '@/app/ui/view/molecule/grid';
import AddTakenLectureButton from '../taken-lecture/add-taken-lecture-button';
import { useFetchSearchLecture } from '@/app/store/querys/lecture';

export default function LectureSearchResult() {
  const { data } = useFetchSearchLecture();

  const renderAddActionButton = (item: SearchedLectureInfoResponse, taken: boolean) => {
    return <AddTakenLectureButton lectureItem={item} isTaken={taken} />;
  };

  const render = (item: SearchedLectureInfoResponse, index: number) => {
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
