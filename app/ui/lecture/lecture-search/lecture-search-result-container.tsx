import List from '../../view/molecule/list';
import Image from 'next/image';
import searchResultIcon from '@/public/assets/searchResultIcon.svg';
import Button from '../../view/atom/button/button';
import Grid from '../../view/molecule/grid';

export interface SearchLectureInfo {
  [index: string]: string | number;
  id: number;
  lectureCode: string;
  name: string;
  credit: number;
}

interface LectureSearchResultContainerProps {
  handleAddButtonClick: (item: SearchLectureInfo) => void;
}

const emptyDataRender = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image src={searchResultIcon} alt="search-result-icon" width={40} height={40} />
      <div className="text-md font-medium text-gray-400">검색 결과가 표시됩니다</div>
    </div>
  );
};

export default function LectureSearchResultContainer({ handleAddButtonClick }: LectureSearchResultContainerProps) {
  const renderAddActionButton = (item: SearchLectureInfo) => {
    return (
      <Button
        variant="list"
        label="추가"
        onClick={() => {
          handleAddButtonClick(item);
        }}
      />
    );
  };
  const render = (item: SearchLectureInfo, index: number) => {
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
      ]}
      render={render}
      isScrollList={true}
      emptyDataRender={emptyDataRender}
    />
  );
}
