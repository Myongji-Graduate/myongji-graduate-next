import Modal from '../../../ui/view/molecule/modal/modal';
import { useMediaQuery } from 'usehooks-ts';
import { DIALOG_KEY } from '@/app/utils/key/dialog.key';
import Drawer from '../../../ui/view/molecule/drawer/drawer';
import ResultCategoryDetailContent from '@/app/ui/result/result-category/result-category-detail-content';
import Responsive from '@/app/ui/responsive';

function ResultCategoryDetailContainer() {
  return (
    <>
      <Responsive maxWidth={767}>
        <Drawer drawerKey={DIALOG_KEY.RESULT_CATEGORY}>
          <ResultCategoryDetailContent />
        </Drawer>
      </Responsive>
      <Responsive minWidth={768}>
        <Modal modalKey={DIALOG_KEY.RESULT_CATEGORY}>
          <ResultCategoryDetailContent />
        </Modal>
      </Responsive>
    </>
  );
}

export default ResultCategoryDetailContainer;
