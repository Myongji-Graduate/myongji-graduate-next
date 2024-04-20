import List from '../../view/molecule/list';
import Image from 'next/image';
import searchResultIcon from '@/public/assets/searchResultIcon.svg';
import Grid from '../../view/molecule/grid';
import AddTakenLectureButton from '../taken-lecture/add-taken-lecture-button';
import { SearchedLectureInfo } from '@/app/type/lecture';
import { fetchSearchLectures } from '@/app/business/lecture/search-lecture.query';

interface LectureSearchResultContainerProps {
  searchParams: {
    keyword?: string;
    type?: string;
  };
}
const emptyDataRender = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image src={searchResultIcon} alt="search-result-icon" width={40} height={40} />
      <div className="text-md font-medium text-gray-400 text-center whitespace-pre-wrap">
        검색 결과가 표시됩니다
        <br />한 글자 이상 검색해주세요
      </div>
    </div>
  );
};

export default async function LectureSearchResultContainer({ searchParams }: LectureSearchResultContainerProps) {
  let searchLectures: SearchedLectureInfo[] = [];
  const hasSearchParams = searchParams.type && searchParams.keyword;
  const isSearchable = searchParams.keyword && searchParams.keyword.length > 1;

  if (hasSearchParams && isSearchable) {
    const data = await fetchSearchLectures(searchParams.type as string, searchParams.keyword as string);
    searchLectures = data.lectures;
  }

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

  return <List data={searchLectures} render={render} isScrollList={true} emptyDataRender={emptyDataRender} />;
}
