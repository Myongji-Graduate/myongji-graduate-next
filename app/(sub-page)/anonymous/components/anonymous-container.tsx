'use client';
import useFunnel from '@/app/hooks/useFunnel';
import SignUpTerm from '../../sign-up/components/sign-up-terms';
import { useState } from 'react';
import UploadTakenLecture from './upload-taken-lecture';

export default function AnonymousContainer() {
  const { Funnel, setStep } = useFunnel<'terms' | 'form' | 'result'>('terms');
  const [result, setResult] = useState();

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
        <UploadTakenLecture
          onNext={(data: any) => {
            setStep('result');
            setResult(data.value);
          }}
        />
      </Funnel.Step>
      <Funnel.Step name="result">{/* <AnonymousResult data={result} /> */}</Funnel.Step>
    </Funnel>
  );
}
