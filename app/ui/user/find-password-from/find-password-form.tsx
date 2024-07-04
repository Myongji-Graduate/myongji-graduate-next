'use client';
import { resetPassword } from '@/app/business/services/user/user.command';
import Form from '../../view/molecule/form';

interface FindPasswordFormProps {
  authId?: string;
}

function FindPasswordForm({ authId }: FindPasswordFormProps) {
  return (
    <Form id="비밀번호 재설정" action={resetPassword}>
      <Form.PasswordInput
        required={true}
        label="비밀번호"
        id="newPassword"
        placeholder="문자, 숫자, 특수문자(!@#$%^&*) 포함 8자리 이상"
      />
      <Form.PasswordInput required={true} label="비밀번호 확인" id="passwordCheck" placeholder="" />
      <div className="hidden">
        <Form.TextInput label="아이디 확인" id="authId" placeholder="" value={authId} />
      </div>
      <Form.SubmitButton label="변경하기" position="center" variant="primary" />
    </Form>
  );
}

export default FindPasswordForm;
