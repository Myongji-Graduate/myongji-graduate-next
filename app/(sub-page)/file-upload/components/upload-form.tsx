import { uploadFile } from '@/app/business/file-upload/file-upload.command';
import Button from '@/app/ui/view/atom/button/button';
import UploadFile from '@/app/ui/view/molecule/upload-file/upload-file';
import React from 'react';

function UploadForm() {
  const handleClickSubmit = async (formData: FormData) => {
    'use server';
    uploadFile(formData);
  };

  return (
    <form action={handleClickSubmit}>
      <UploadFile />
      <Button label={'결과 보러가기'} size="md" type="submit" />
    </form>
  );
}

export default UploadForm;
