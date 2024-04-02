'use client';
import Form from '../../view/molecule/form';
import { authenticate } from '@/app/business/user/user.command';

interface SignInFormProps {
  onNext?: () => void;
}

export default function SignInForm({ onNext }: SignInFormProps) {
  return (
    <Form onSuccess={onNext} id="로그인" action={authenticate}>
      <Form.TextInput required={true} label="아이디" id="authId" placeholder="아이디를 입력하세요" />
      <Form.PasswordInput required={true} label="비밀번호" id="password" placeholder="비밀번호를 입력하세요" />
      <Form.SubmitButton label="로그인" position="center" variant="primary" />
    </Form>
  );
}
