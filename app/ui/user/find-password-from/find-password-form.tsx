'use client';
import { resetPassword } from '@/app/business/services/user/user.command';
import Form from '../../view/molecule/form';
import { useToast } from '../../view/molecule/toast/use-toast';
import { redirect } from 'next/navigation';

interface FindPasswordFormProps {
  authId?: string;
}

function FindPasswordForm({ authId }: FindPasswordFormProps) {
  const { toast } = useToast();

  const onSuccess = () => {
    toast({
      title: '비밀번호가 변경되었어요.',
    });
    redirect('/sign-in');
  };

  return (
    <Form id="비밀번호 재설정" action={resetPassword} onSuccess={onSuccess} className="flex flex-col gap-4">
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
      <div className="py-6">
        <Form.SubmitButton label="변경하기" position="center" variant="primary" />
      </div>
    </Form>
  );
}

export default FindPasswordForm;
