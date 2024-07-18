'use client';
import useFunnel from '@/app/hooks/useFunnel';
import FindIdForm from '@/app/ui/user/find-id-form/find-id-form';
import { useState } from 'react';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import FindIdSuccess from './find-id-success';

export default function FindIdContainer() {
  const { Funnel, setStep } = useFunnel<'form' | 'success'>('form');
  const [authId, setAuthId] = useState<string | undefined>(undefined);
  return (
    <div className="p-6">
      <Funnel>
        <Funnel.Step name="form">
          <FindIdForm
            onNext={(formState?: FormState) => {
              if (formState?.value) setAuthId(formState.value.authId);
              setStep('success');
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="success">
          <FindIdSuccess authId={authId} />
        </Funnel.Step>
      </Funnel>
    </div>
  );
}
