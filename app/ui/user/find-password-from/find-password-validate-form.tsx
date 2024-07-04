import { findUserToStudentNumber, validateUser } from '@/app/business/services/user/user.query';
import Form from '../../view/molecule/form';
import { FormState } from '../../view/molecule/form/form-root';

interface FindPasswordValidateFormProps {
  onNext?: (formState?: FormState) => void;
}
function FindPasswordValidateForm({ onNext }: FindPasswordValidateFormProps) {
  return (
    <div>
      <Form id="가입자 검증" onSuccess={onNext} action={validateUser}>
        <Form.TextInput required={true} label="아이디" id="authId" placeholder="아이디를 입력해주세요." />
        <Form.TextInput required={true} label="학번" id="studentNumber" placeholder="ex ) 60xxxxxx" />
        <Form.SubmitButton label="검사하기" position="center" variant="primary" />
      </Form>
    </div>
  );
}

export default FindPasswordValidateForm;
