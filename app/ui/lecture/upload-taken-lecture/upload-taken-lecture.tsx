'use client';

import { registerUserGrade } from '@/app/business/services/lecture/taken-lecture.command';
import UploadPdf from '@/app/ui/view/molecule/upload-pdf/upload-pdf';
import Form from '../../view/molecule/form';
import { FormState } from '../../view/molecule/form/form-root';
import { useRouter } from 'next/navigation';
import { HONORS_TARGET_MAJOR_OPTIONS } from '@/app/constants/honors-target-major';
import { useState } from 'react';

function UploadTakenLecture() {
  const router = useRouter();
  const [isHonorsCollege, setIsHonorsCollege] = useState(false);
  const handleSuccess = (formState?: FormState) => {
    if (formState?.isSuccess) router.push('/my');
  };

  return (
    <Form action={registerUserGrade} id="성적업로드" onSuccess={handleSuccess}>
      <UploadPdf />
      <label className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-700">
        <input type="checkbox" name="honorsCollege" onChange={(event) => setIsHonorsCollege(event.target.checked)} />
        아너칼리지 입학생입니다
      </label>
      {isHonorsCollege && (
        <label className="mx-auto mt-3 block w-80 text-sm text-gray-700 md:w-96">
          <span className="mb-1 block">졸업요건 기준 학과 (진입예정학과)</span>
          <select
            className="h-10 w-full rounded border border-gray-300 bg-white px-3"
            name="honorsTargetMajor"
            required
          >
            <option value="">학과 선택</option>
            {HONORS_TARGET_MAJOR_OPTIONS.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-gray-500">학생설계전공 단일전공은 현재 지원하지 않습니다.</span>
        </label>
      )}
      <div className="py-6">
        <Form.SubmitButton label="결과 보러가기" position="center" size="md" />
      </div>
    </Form>
  );
}

export default UploadTakenLecture;
