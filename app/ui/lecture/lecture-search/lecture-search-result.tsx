import { SearchedLectureInfo } from '@/app/type/lecture';
import List from '@/app/ui/view/molecule/list';
import Grid from '@/app/ui/view/molecule/grid';
import AddTakenLectureButton from '../taken-lecture/add-taken-lecture-button';
import { useFetchSearchLecture } from '@/app/store/querys/user';

export default function LectureSearchResult() {
  const { data } = useFetchSearchLecture();

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
