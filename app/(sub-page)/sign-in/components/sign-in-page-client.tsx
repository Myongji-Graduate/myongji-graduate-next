'use client';
import { useEffect } from 'react';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import useDialog from '@/app/hooks/useDialog';

export default function SignInPageClient() {
  const { close: closeUserDeleteDialog } = useDialog(DIALOG_KEY.USER_DELETE);

  useEffect(() => {
    closeUserDeleteDialog();
  }, []);

  return null;
}
