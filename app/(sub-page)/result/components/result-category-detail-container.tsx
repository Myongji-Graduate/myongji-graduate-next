import Modal from '../../../ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog.key';
import Drawer from '../../../ui/view/molecule/drawer/drawer';
import ResultCategoryDetailContent from '@/app/ui/result/result-category/result-category-detail-content';
import Responsive from '@/app/ui/responsive';
import { fetchResultCategoryDetailInfo } from '@/app/business/result/result.query';

function responsiveDialog(children: React.ReactNode) {
  return (
    <>
      <Responsive maxWidth={767}>
        <Drawer drawerKey={DIALOG_KEY.RESULT_CATEGORY}>{children}</Drawer>
      </Responsive>
      <Responsive minWidth={768}>
        <Modal modalKey={DIALOG_KEY.RESULT_CATEGORY}>{children}</Modal>
      </Responsive>
    </>
  );
}

export default async function ResultCategoryDetailContainer({ category }: { category: string }) {
  const data = await fetchResultCategoryDetailInfo(category);
  return responsiveDialog(<ResultCategoryDetailContent info={data} />);
}

export function ResultCategoryDetailContainerSkeleton() {
  return responsiveDialog(<div className="flex flex-col items-center p-4  space-y-3"></div>);
}
