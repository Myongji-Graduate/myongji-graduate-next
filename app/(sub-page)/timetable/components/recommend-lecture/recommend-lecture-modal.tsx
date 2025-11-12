'use client';

import Modal from '@/app/ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';
import RecommendLectureModalContent from './recommend-lecture-modal-content';

function RecommendLectureModal() {
  return (
    <>
      <Responsive minWidth={570}>
        <Modal modalKey={DIALOG_KEY.RECOMMEND_LECTURE}>
          <div className="flex flex-col gap-5 md:gap-6 pb-4 md:pb-6 w-[800px] max-lg:w-[450px] h-[60vh] lg:h-[80vh]">
            <RecommendLectureModalContent />
          </div>
        </Modal>
      </Responsive>
      <Responsive maxWidth={569}>
        <Modal modalKey={DIALOG_KEY.RECOMMEND_LECTURE}>
          <div className="flex flex-col gap-5 md:gap-6 pb-4 md:pb-6 w-[75vw] h-[60vh]">
            <RecommendLectureModalContent />
          </div>
        </Modal>
      </Responsive>
    </>
  );
}

export default RecommendLectureModal;
