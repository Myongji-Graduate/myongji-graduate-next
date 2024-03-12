import { registUserGrade } from '@/app/business/lecture/taken-lecture.command';
import Button from '@/app/ui/view/atom/button/button';
import UploadPdf from '@/app/ui/view/molecule/upload-pdf/upload-pdf';

function UploadGradeCard() {
  const handleSubmitGradeCard = async (formData: FormData) => {
    'use server';
    await registUserGrade(formData);
  };

  return (
    <form action={handleSubmitGradeCard} className="grid place-items-center gap-4">
      <UploadPdf />
      <Button label={'결과 보러가기'} size="md" type="submit" />
    </form>
  );
}

export default UploadGradeCard;
