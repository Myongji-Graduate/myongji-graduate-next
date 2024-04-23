import List from '../../view/molecule/list';
import Grid from '../../view/molecule/grid';
import AddTakenLectureButton from '../taken-lecture/add-taken-lecture-button';
import { SearchedLectureInfo } from '@/app/type/lecture';
import { fetchSearchLectures } from '@/app/business/lecture/search-lecture.query';

interface LectureSearchResultContainerProps {
  keyword: string;
  type: string;
}

export default async function LectureSearchResultContainer({ keyword, type }: LectureSearchResultContainerProps) {
  const data = await fetchSearchLectures(type, keyword);

  const renderAddActionButton = (item: SearchedLectureInfo, isTaken: boolean) => {
    return <AddTakenLectureButton lectureItem={item} isTaken={isTaken} />;
  };

  const render = (item: SearchedLectureInfo, index: number) => {
    const searchLectureItem = item;
    return (
      <List.Row key={index}>
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

  return <List data={data.lectures} render={render} isScrollList={true} />;
}
