'use client';

import useDialog from '@/app/hooks/useDialog';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { useCallback } from 'react';

export function useDeleteUserSuccess() {
  const { close } = useDialog(DIALOG_KEY.USER_DELETE);

  const onSuccess = useCallback(
    (state?: FormState) => {
      if (!state?.isSuccess) return;
      close();
      window.location.replace('/sign-in');
    },
    [close],
  );

  return onSuccess;
}
