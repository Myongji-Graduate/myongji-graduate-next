'use client';
import Modal from '../../view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Drawer from '../../view/molecule/drawer/drawer';
import Responsive from '@/app/ui/responsive';
import React from 'react';
import { useAtomValue } from 'jotai';
import { isDialogOpenAtom } from '@/app/store/stores/dialog';

interface ResultCategoryDetailDialogProp {
  children: React.ReactNode;
  querystring?: string;
}

export default function ResultCategoryDetailDialog({ children }: ResultCategoryDetailDialogProp) {
  const isOpenDialog = useAtomValue(isDialogOpenAtom);

  const handleCloseDialog = () => {
    if (isOpenDialog) window.history.go(-1);
    window.history.replaceState({}, '', '/result');
  };

  return (
    <>
      <Responsive maxWidth={767}>
        <Drawer drawerKey={DIALOG_KEY.RESULT_CATEGORY} onClose={handleCloseDialog} className="h-[90vh]">
          {children}
        </Drawer>
      </Responsive>
      <Responsive minWidth={768}>
        <Modal modalKey={DIALOG_KEY.RESULT_CATEGORY} onClose={handleCloseDialog}>
          {children}
        </Modal>
      </Responsive>
    </>
  );
}
