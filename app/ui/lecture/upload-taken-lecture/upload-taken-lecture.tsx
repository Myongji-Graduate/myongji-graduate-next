'use client';

import { registerUserGrade } from '@/app/business/services/lecture/taken-lecture.command';
import UploadPdf from '@/app/ui/view/molecule/upload-pdf/upload-pdf';
import Form from '../../view/molecule/form';

function UploadTakenLecture() {
  return (
    <Form action={registerUserGrade} id="성적업로드">
      <UploadPdf />
      <div className="py-6">
        <Form.SubmitButton label="결과 보러가기" position="center" size="md" />
      </div>
    </Form>
  );
}

export default UploadTakenLecture;
