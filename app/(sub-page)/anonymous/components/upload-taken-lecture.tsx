'use client';
import { registerAnonymousGrade } from '@/app/business/services/lecture/taken-lecture.command';
import Form from '@/app/ui/view/molecule/form';
import UploadPdf from '@/app/ui/view/molecule/upload-pdf/upload-pdf';
import Manual from '../../grade-upload/components/manual';

interface UploadTakenLectureProp {
  onNext?: (data: any) => void;
}

function UploadTakenLecture({ onNext }: UploadTakenLectureProp) {
  const handleSuccess = (data: any) => {
    onNext?.(data);
  };

  return (
    <Form action={registerAnonymousGrade} id="성적업로드" onSuccess={handleSuccess}>
      <Manual />
      <div className="mt-8 md:w-96 w-80 m-auto flex flex-col gap-4">
        <Form.Select
          required={true}
          label="영어성적"
          id="engLv"
          placeholder="선택하세요"
          options={[
            { value: 'BASIC', placeholder: '기초영어' },
            { value: 'ENG12', placeholder: 'Level12' },
            { value: 'ENG34', placeholder: 'Level34' },
            { value: 'FREE', placeholder: '면제' },
          ]}
        />
        <UploadPdf />
      </div>
      <div className="py-6">
        <Form.SubmitButton label="결과 보러가기" position="center" size="md" />
      </div>
    </Form>
  );
}

export default UploadTakenLecture;
