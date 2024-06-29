'use client';
import { findPassword } from '@/app/business/services/user/user.command';
import Form from '../../view/molecule/form';

function FindPasswordForm() {
  return (
    <Form id="비밀번호 재설정" action={findPassword}>
      <Form.TextInput required={true} label="아이디" id="authId" placeholder="아이디를 입력해주세요." />
      <Form.TextInput required={true} label="학번" id="studentNumber" placeholder="ex ) 60xxxxxx" />
      <Form.SubmitButton label="찾기" position="center" variant="primary" />
    </Form>
  );
}

export default FindPasswordForm;
