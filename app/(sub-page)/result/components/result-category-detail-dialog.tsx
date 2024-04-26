'use client';
import Modal from '../../../ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Drawer from '../../../ui/view/molecule/drawer/drawer';
import Responsive from '@/app/ui/responsive';
import React, { useEffect } from 'react';
import useDialog from '@/app/hooks/useDialog';
import { useRouter } from 'next/navigation';

interface ResultCategoryDetailDialogProp {
  children: React.ReactNode;
  querystring?: string;
}

export default function ResultCategoryDetailDialog({ children, querystring }: ResultCategoryDetailDialogProp) {
  const { replace } = useRouter();
  const { isOpen, open } = useDialog(DIALOG_KEY.RESULT_CATEGORY);

  useEffect(() => {
    if (querystring && !isOpen) open();
  }, []);

  const handleCloseDialog = () => {
    replace('/result');
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
