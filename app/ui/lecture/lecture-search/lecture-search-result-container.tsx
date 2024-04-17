import List from '../../view/molecule/list';
import Image from 'next/image';
import searchResultIcon from '@/public/assets/searchResultIcon.svg';
import Grid from '../../view/molecule/grid';
import { LectureInfo } from '@/app/type/lecture';
import AddTakenLectureButton from '../taken-lecture/add-taken-lecture-button';

const emptyDataRender = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image src={searchResultIcon} alt="search-result-icon" width={40} height={40} />
      <div className="text-md font-medium text-gray-400">검색 결과가 표시됩니다</div>
    </div>
  );
};

export default function LectureSearchResultContainer() {
  const renderAddActionButton = (item: LectureInfo) => {
    return <AddTakenLectureButton lectureItem={item} />;
  };
  const render = (item: LectureInfo, index: number) => {
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

  return (
    <List
      data={[
        { id: 3, lectureCode: 'HCB03490', name: '경영정보사례연구', credit: 3 },
        { id: 4, lectureCode: 'HCB03490', name: '게임을통한경영의이해', credit: 3 },
        { id: 5, lectureCode: 'HCB03490', name: '게임을통한경영의이해', credit: 3 },
        { id: 6, lectureCode: 'HCB03490', name: '게임을통한경영의이해', credit: 3 },
        { id: 7, lectureCode: 'HCB03490', name: '게임을통한경영의이해', credit: 3 },
        { id: 8, lectureCode: 'HCB03490', name: '게임을통한경영의이해', credit: 3 },
      ]}
      render={render}
      isScrollList={true}
      emptyDataRender={emptyDataRender}
    />
  );
}
