'use client';
import useDialog from '@/app/hooks/useDialog';
import SignInForm from '@/app/ui/user/sign-in-form/sign-in-form';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import React from 'react';
import UpdateInstruction from './update-instruction';
import { FormState } from '@/app/ui/view/molecule/form/form-root';

export default function SignInFormContainer() {
  const { open } = useDialog(DIALOG_KEY.UPDATE_INSTRUCTION);
  const handleSuccess = (formState?: FormState) => {
    if (formState?.message === '재업로드') open();
  };
  return (
    <>
      <SignInForm onSuccess={handleSuccess} />
      <UpdateInstruction />
    </>
  );
}
