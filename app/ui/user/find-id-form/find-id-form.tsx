'use client';
import { findId } from '@/app/business/services/user/user.command';
import Form from '../../view/molecule/form';

function FindIdForm() {
  return (
    <Form id="아이디 찾기" action={findId}>
      <Form.TextInput required={true} label="학번" id="studentNumber" placeholder="ex ) 60xxxxxx" />
      <Form.SubmitButton label="찾기" position="center" variant="primary" />
    </Form>
  );
}

export default FindIdForm;
