'use client';
import Modal from '../../../ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Drawer from '../../../ui/view/molecule/drawer/drawer';
import Responsive from '@/app/ui/responsive';
import React from 'react';

export const handleCloseDialog = () => {
  window.history.go(-1);
  window.history.replaceState({}, '', '/result');
};

interface ResultCategoryDetailDialogProp {
  children: React.ReactNode;
}

export default function ResultCategoryDetailDialog({ children }: ResultCategoryDetailDialogProp) {
  return (
    <>
      <Responsive maxWidth={767}>
        <Drawer drawerKey={DIALOG_KEY.RESULT_CATEGORY} closeDialog={handleCloseDialog}>
          {children}
        </Drawer>
      </Responsive>
      <Responsive minWidth={768}>
        <Modal modalKey={DIALOG_KEY.RESULT_CATEGORY} closeDialog={handleCloseDialog}>
          {children}
        </Modal>
      </Responsive>
    </>
  );
}
