import React from 'react';
import Image from 'next/image';
import searchResultIcon from '@/public/assets/searchResultIcon.svg';
import List from '../../view/molecule/list';

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

export default function EmptyDataContainer() {
  return <List data={[]} isScrollList={true} emptyDataRender={emptyDataRender} />;
}
