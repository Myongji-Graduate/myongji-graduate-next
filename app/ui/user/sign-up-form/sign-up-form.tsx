'use client';
import { createUser } from '@/app/business/services/user/user.command';
import Form from '../../view/molecule/form';

interface SignUpFormProps {
  onNext?: () => void;
}

export default function SignUpForm({ onNext }: SignUpFormProps) {
  return (
    <Form onSuccess={onNext} action={createUser} id="회원가입">
      <Form.TextInput required={true} label="아이디" id="authId" placeholder="6자 이상 20자 이하" />
      <Form.PasswordInput
        required={true}
        label="비밀번호"
        id="password"
        placeholder="특수문자(!@#$%^&*), 문자, 숫자를 포함한 8자 이상 20자 이하"
      />
      <Form.PasswordInput required={true} label="비밀번호 확인" id="confirmPassword" placeholder="" />
      <Form.NumberInput required={true} label="학번" id="studentNumber" placeholder="ex)60xxxxxx" />
      <Form.Select
        required={true}
        label="영어"
        id="engLv"
        placeholder="선택하세요"
        options={[
          { value: 'basic', placeholder: '기초영어' },
          { value: 'ENG12', placeholder: 'Level12' },
          { value: 'ENG34', placeholder: 'Level34' },
          { value: 'bypass', placeholder: '면제' },
        ]}
      />
      <Form.SubmitButton label="회원가입" position="center" variant="secondary" />
    </Form>
  );
}
