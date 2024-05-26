'use client';
import useFunnel from '@/app/hooks/useFunnel';
import SignUpForm from '@/app/ui/user/sign-up-form/sign-up-form';
import SignUpTerm from './sign-up-terms';
import SignUpSuccess from './sign-up-success';

export default function SignUpContainer() {
  const { Funnel, setStep } = useFunnel<'terms' | 'form' | 'success'>('terms');

  return (
    <div className="p-6">
      <Funnel>
        <Funnel.Step name="terms">
          <SignUpTerm
            onNext={() => {
              setStep('form');
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="form">
          <SignUpForm
            onNext={() => {
              setStep('success');
            }}
          />
        </Funnel.Step>
        <Funnel.Step name="success">
          <SignUpSuccess />
        </Funnel.Step>
      </Funnel>
    </div>
  );
}
