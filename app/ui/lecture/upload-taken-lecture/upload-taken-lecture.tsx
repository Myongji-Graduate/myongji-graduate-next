'use client';

import { registerUserGrade } from '@/app/business/services/lecture/taken-lecture.command';
import UploadPdf from '@/app/ui/view/molecule/upload-pdf/upload-pdf';
import Form from '../../view/molecule/form';
import { FormState } from '../../view/molecule/form/form-root';
import { useRouter } from 'next/navigation';

function UploadTakenLecture() {
  const router = useRouter();
  const handleSuccess = (formState?: FormState) => {
    if (formState?.isSuccess) router.push('/my');
  };

  return (
    <Form action={registerUserGrade} id="성적업로드" onSuccess={handleSuccess}>
      <UploadPdf />
      <div className="py-6">
        <Form.SubmitButton label="결과 보러가기" position="center" size="md" />
      </div>
    </Form>
  );
}

export default UploadTakenLecture;
