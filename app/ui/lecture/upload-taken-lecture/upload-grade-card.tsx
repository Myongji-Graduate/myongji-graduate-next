'use client';

import { registUserGrade } from '@/app/business/lecture/taken-lecture.command';
import UploadPdf from '@/app/ui/view/molecule/upload-pdf/upload-pdf';
import Form from '../../view/molecule/form';

function UploadGradeCard() {
  return (
    <Form action={registUserGrade} id="성적업로드">
      <UploadPdf />
      <Form.SubmitButton label="결과 보러가기" position="center" size="md" />
    </Form>
  );
}

export default UploadGradeCard;
