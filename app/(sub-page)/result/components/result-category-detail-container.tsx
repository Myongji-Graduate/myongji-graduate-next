import Modal from '../../../ui/view/molecule/modal/modal';
import { useMediaQuery } from 'usehooks-ts';
import { DIALOG_KEY } from '@/app/utils/key/dialog.key';
import Drawer from '../../../ui/view/molecule/drawer/drawer';
import ResultCategoryDetailContent from '@/app/ui/result/result-category/result-category-detail-content';

function ResultCategoryDetailContainer() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <>
      {isDesktop ? (
        <Modal modalKey={DIALOG_KEY.RESULT_CATEGORY}>
          <ResultCategoryDetailContent />
        </Modal>
      ) : (
        <Drawer modalKey={DIALOG_KEY.RESULT_CATEGORY}>
          <ResultCategoryDetailContent />
        </Drawer>
      )}
    </>
  );
}

export default ResultCategoryDetailContainer;
