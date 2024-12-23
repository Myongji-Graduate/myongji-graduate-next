'use client';
import useFunnel from '@/app/hooks/useFunnel';
import SignUpTerm from '../../sign-up/components/sign-up-terms';
import { AnonymousResultType } from '@/app/utils/parser/anonymous';
import AnonymousUpload from './anonymous-upload';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { useRouter } from 'next/navigation';
import { useAnonymousContext } from '../result/provider';

function isAnonymousResultType(formdata: any): formdata is AnonymousResultType {
  return formdata && 'graduationResult' in formdata && 'user' in formdata;
}

export default function AnonymousContainer() {
  const router = useRouter();
  const { setResult } = useAnonymousContext();
  const { Funnel, setStep } = useFunnel<'terms' | 'form'>('terms');

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
            if (isAnonymousResultType(formState?.value)) {
              setResult(formState.value);
              router.push('/anonymous/result');
            }
          }}
        />
      </Funnel.Step>
    </Funnel>
  );
}
