'use client';
import useFunnel from '@/app/hooks/useFunnel';
import SignUpTerm from '../../sign-up/components/sign-up-terms';
import { useState } from 'react';
import AnonymousResult from './anonymous-result';
import { AnonymousResultType } from '@/app/utils/parser/anonymous';
import AnonymousUpload from './anonymous-upload';
import { FormState } from '@/app/ui/view/molecule/form/form-root';

function isAnonymousResultType(formdata: any): formdata is AnonymousResultType {
  return formdata && 'graduationResult' in formdata && 'user' in formdata;
}

export default function AnonymousContainer() {
  const { Funnel, setStep } = useFunnel<'terms' | 'form' | 'result'>('terms');
  const [result, setResult] = useState<AnonymousResultType>();

  return (
    <Funnel>
      <Funnel.Step name="terms">
        <SignUpTerm
          onNext={() => {
            setStep('form');
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="form">
        <AnonymousUpload
          onNext={(formState?: FormState) => {
            setStep('result');
            if (isAnonymousResultType(formState?.value)) {
              setResult(formState.value);
            }
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="result">
        <AnonymousResult data={result} onPrevious={() => setStep('form')} />
      </Funnel.Step>
    </Funnel>
  );
}
