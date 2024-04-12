import { Table } from '../../view/molecule/table';
import CompletedCategory from '@/app/(sub-page)/result/components/completed-category';
import LabelContainer from '@/app/ui/view/atom/label-container/label-container';

const headerInfo = ['과목코드', '과목명', '학점'];

function ResultCagegoryDetailLecture() {
  const DUMMYDATA = [
    { id: 0, code: 'HEC01208', name: '데이터구조와알고리즘', credit: 3 },
    { id: 0, code: 'HEC01208', name: '데이터구조와알고리즘', credit: 3 },
  ];

  return (
    <>
      <LabelContainer label="전공필수" rightElement={<div className="text-2xl text-gray-6">18 / 18</div>} />
      <CompletedCategory />
      <LabelContainer label="전공선택" rightElement={<div className="text-2xl text-gray-6">18 / 18</div>} />
      <Table headerInfo={headerInfo} data={DUMMYDATA} />
    </>
  );
}

export default ResultCagegoryDetailLecture;
