'use client';
import Manual from '@/app/(sub-page)/grade-upload/components/manual';
import { registerAnonymousGrade } from '@/app/business/services/lecture/taken-lecture.command';
import Form from '@/app/ui/view/molecule/form';
import UploadPdf from '@/app/ui/view/molecule/upload-pdf/upload-pdf';
import { HONORS_TARGET_MAJOR_OPTIONS } from '@/app/constants/honors-target-major';
import { useState } from 'react';

interface UploadTakenLectureAnonymousProp {
  onSuccess?: (data: any) => void;
}

function UploadTakenLectureAnonymous({ onSuccess }: UploadTakenLectureAnonymousProp) {
  const [isHonorsCollege, setIsHonorsCollege] = useState(false);
  const handleSuccess = (data: any) => {
    onSuccess?.(data);
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
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" name="honorsCollege" onChange={(event) => setIsHonorsCollege(event.target.checked)} />
          아너칼리지 입학생입니다
        </label>
        {isHonorsCollege && (
          <label className="block text-sm text-gray-700">
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
      </div>
      <div className="py-6">
        <Form.SubmitButton label="결과 보러가기" position="center" size="md" />
      </div>
    </Form>
  );
}

export default UploadTakenLectureAnonymous;
