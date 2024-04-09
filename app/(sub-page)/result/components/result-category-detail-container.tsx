import Modal from '../../../ui/view/molecule/modal/modal';
import { useMediaQuery } from 'usehooks-ts';
import { MODAL_KEY } from '@/app/utils/key/modal.key';
import Drawer from '../../../ui/view/molecule/drawer/drawer';
import ResultCategoryDetailContent from '@/app/ui/result/result-category-detail-content/result-category-detail-content';

function ResultCategoryDetailContainer() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <>
      {isDesktop ? (
        <Modal modalKey={MODAL_KEY.RESULT_CATEGORY}>
          <ResultCategoryDetailContent />
        </Modal>
      ) : (
        <Drawer modalKey={MODAL_KEY.RESULT_CATEGORY}>
          <ResultCategoryDetailContent />
        </Drawer>
      )}
    </>
  );
}

export default ResultCategoryDetailContainer;
