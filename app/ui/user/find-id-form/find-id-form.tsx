'use client';
import { findId } from '@/app/business/services/user/user.query';
import Form from '../../view/molecule/form';
import { FormState } from '../../view/molecule/form/form-root';

interface SignUpFormProps {
  onNext?: (formState?: FormState) => void;
}

function FindIdForm({ onNext }: SignUpFormProps) {
  return (
    <Form onSuccess={onNext} id="아이디찾기" action={findId}>
      <Form.TextInput required={true} label="학번" id="studentNumber" placeholder="ex ) 60xxxxxx" />
      <Form.SubmitButton label="아이디찾기" position="center" variant="primary" />
    </Form>
  );
}

export default FindIdForm;
