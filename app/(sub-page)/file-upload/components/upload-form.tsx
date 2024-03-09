import { uploadFile } from '@/app/business/file-upload/file-upload.command';
import Button from '@/app/ui/view/atom/button/button';
import UploadFile from '@/app/ui/view/molecule/upload-file/upload-file';
import React from 'react';

function UploadForm() {
  //도메인 컴포넌트 네이밍
  //도메인 계층
  const handleClickSubmit = async (formData: FormData) => {
    //도메인 이벤트 네이밍
    'use server';
    uploadFile(formData);
  };

  return (
    //이건 고민해볼게요
    <form action={handleClickSubmit} className="grid place-items-center">
      <UploadFile />
      <Button label={'결과 보러가기'} size="md" type="submit" />
    </form>
  );
}

export default UploadForm;
