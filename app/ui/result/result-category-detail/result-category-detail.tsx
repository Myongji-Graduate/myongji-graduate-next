import LabelContainer from '@/app/ui/view/atom/label-container/label-container';
import Modal from '../../view/molecule/modal/modal';
import { cn } from '@/app/utils/shadcn/utils';
import { useMediaQuery } from 'usehooks-ts';
import { Table } from '../../view/molecule/table';
// import CategoryFullfill from '@/app/(sub-page)/result/components/completed-category';
import { MODAL_KEY } from '@/app/utils/key/modal.key';

function ResultCategoryDetail() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <>
      {isDesktop ? (
        <Modal modalKey={MODAL_KEY.RESULT_CATEGORY}>
          <ResultCategoryDetailContent />
        </Modal>
      ) : (
        // <Drawer>
        //   <ResultCategoryDetailContent />
        // </Drawer>
        <></>
      )}
    </>
  );
}

export default ResultCategoryDetail;

const headerInfo = ['과목코드', '과목명', '학점'];

function ResultCategoryDetailContent() {
  const DUMMYDATA = [
    { id: 0, code: 'HEC01208', name: '데이터구조와알고리즘', credit: 3 },
    { id: 0, code: 'HEC01208', name: '데이터구조와알고리즘', credit: 3 },
  ];

  return (
    <div className="md:w-[80vw] max-w-[1200px] p-2">
      <div className="flex justify-between">
        <div>
          <h1 className={cn('text-2xl font-bold', 'md:text-4xl')}>전공필수</h1>
          <p className={cn('text-sm text-gray-6 font-medium my-6', 'md:text-lg')}>
            전공필수 과목 중 미이수과목이 표시됩니다.
          </p>
        </div>
        <div className={cn('text-2xl font-bold', 'md:text-4xl')}>
          <span className="text-point-blue">18</span> / 18
        </div>
      </div>
      <LabelContainer label="전공필수" rightElement={<div className="text-2xl text-gray-6">18 / 18</div>} />
      {/* <CategoryFullfill /> */}
      <LabelContainer label="전공선택" rightElement={<div className="text-2xl text-gray-6">18 / 18</div>} />
      <Table headerInfo={headerInfo} data={DUMMYDATA} />
    </div>
  );
}
