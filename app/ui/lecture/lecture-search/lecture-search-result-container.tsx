import List from '../../view/molecule/list';
import Grid from '../../view/molecule/grid';
import AddTakenLectureButton from '../taken-lecture/add-taken-lecture-button';
import { LectureSearchParams, SearchedLectureInfo } from '@/app/type/lecture';
import { fetchSearchLectures } from '@/app/business/lecture/search-lecture.query';
import LoadingSpinner from '../../view/atom/loading-spinner';

export default async function LectureSearchResultContainer({ keyword, type }: LectureSearchParams) {
  const data = await fetchSearchLectures(type as string, keyword as string);

  const hasNoResultData = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-md font-medium text-gray-500 text-center whitespace-pre-wrap">
          {`"${keyword}"`}에 대한 검색 결과를 찾을 수 없습니다
        </div>
      </div>
    );
  };

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

  return <List data={data.lectures} render={render} isScrollList={true} emptyDataRender={hasNoResultData} />;
}

export function LectureSearchResultContainerSpinner() {
  return (
    <div
      className={'rounded-xl border-[1px] border-gray-300 w-full h-72 overflow-auto flex justify-center items-center'}
    >
      <LoadingSpinner
        className={'animate-spin shrink-0 h-12 w-12 mr-1.5 -ml-1 fill-gray-400'}
        style={{ transition: `width 150ms` }}
      />
    </div>
  );
}
