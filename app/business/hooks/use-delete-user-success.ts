'use client';

import useDialog from '@/app/hooks/useDialog';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useDeleteUserSuccess() {
  const router = useRouter();
  const { close } = useDialog(DIALOG_KEY.USER_DELETE);

  const onSuccess = useCallback(
    (state?: FormState) => {
      if (!state?.isSuccess) return;
      close();
      router.push('/sign-in');
    },
    [close, router],
  );

  return onSuccess;
}
