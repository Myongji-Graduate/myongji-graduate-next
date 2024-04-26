'use client';
import Modal from '../../../ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Drawer from '../../../ui/view/molecule/drawer/drawer';
import Responsive from '@/app/ui/responsive';
import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { isDialogOpenAtom } from '@/app/store/dialog';
import useDialog from '@/app/hooks/useDialog';

interface ResultCategoryDetailDialogProp {
  children: React.ReactNode;
  querystring?: string;
}

export default function ResultCategoryDetailDialog({ children, querystring }: ResultCategoryDetailDialogProp) {
  const isOpenDialog = useAtomValue(isDialogOpenAtom);

  const { isOpen, open } = useDialog(DIALOG_KEY.RESULT_CATEGORY);

  useEffect(() => {
    if (querystring && !isOpen) open();
  }, []);

  const handleCloseDialog = () => {
    if (isOpenDialog) window.history.go(-1);
    window.history.replaceState({}, '', '/result');
  };

  return (
    <>
      <Responsive maxWidth={767}>
        <Drawer drawerKey={DIALOG_KEY.RESULT_CATEGORY} closeDialog={handleCloseDialog} className="h-[90vh]">
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
