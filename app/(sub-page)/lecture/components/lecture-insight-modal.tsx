import React from 'react';
import Modal from '@/app/ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';

export default function LectureInsightModal() {
  return (
    <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
      <div className="max-lg:w-72 lg:p-6">
        <h3 className="font-semibold mb-4">강의 상세 정보</h3>
      </div>
    </Modal>
  );
}
