import List from '../../view/molecule/list';
import Image from 'next/image';
import searchResultIcon from '@/public/assets/searchResultIcon.svg';
import Grid from '../../view/molecule/grid';
import { SearchedLectureInfo } from '@/app/type/lecture';
import { useLectureStore } from '@/app/stores/lecture.store';
import AddTakenLecutreButton from '../taken-lecture/add-taken-lecture-button';

interface LectureSearchResultContainerProps {}

const emptyDataRender = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image src={searchResultIcon} alt="search-result-icon" width={40} height={40} />
      <div className="text-md font-medium text-gray-400">검색 결과가 표시됩니다</div>
    </div>
  );
};

export default function LectureSearchResultContainer() {
  const searchedLectures = useLectureStore((state) => state.searchedLectures);

  const renderAddActionButton = (item: SearchedLectureInfo) => {
    return <AddTakenLecutreButton lectureItem={item} />;
  };
  const render = (item: SearchedLectureInfo, index: number) => {
    const searchLectureItem = item;
    return (
      <List.Row key={index}>
        <Grid cols={4}>
          {Object.keys(searchLectureItem).map((key, index) => {
            if (key === 'id') return null;
            return <Grid.Column key={index}>{searchLectureItem[key]}</Grid.Column>;
          })}
          {renderAddActionButton ? <Grid.Column>{renderAddActionButton(searchLectureItem)}</Grid.Column> : null}
        </Grid>
      </List.Row>
    );
  };

  return <List data={searchedLectures} render={render} isScrollList={true} emptyDataRender={emptyDataRender} />;
}
