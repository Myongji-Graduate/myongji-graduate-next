'use client';

import useFunnel from '@/app/hooks/useFunnel';
import FindPasswordForm from '@/app/ui/user/find-password-from/find-password-form';
import FindPasswordValidateForm from '@/app/ui/user/find-password-from/find-password-validate-form';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { useState } from 'react';

function FindPasswordContainer() {
  const { Funnel, setStep } = useFunnel<'validate' | 'form'>('validate');
  const [authId, setAuthId] = useState<string>('');

  return (
    <div className="p-6">
      <Funnel>
        <Funnel.Step name="validate">
          <FindPasswordValidateForm
            onNext={(formState?: FormState) => {
              setStep('form');
              if (formState?.value) setAuthId(formState?.value.authId);
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="form">
          <FindPasswordForm authId={authId} />
        </Funnel.Step>
      </Funnel>
    </div>
  );
}

export default FindPasswordContainer;
