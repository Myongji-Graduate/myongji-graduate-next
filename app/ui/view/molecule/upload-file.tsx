'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/ui/view/atom/button/button';

type FileType = File | null;

interface UploadFileProps {
  handleSubmit: (file: FileType) => void;
}

function UploadFile({ handleSubmit }: UploadFileProps) {
  const [file, setFile] = useState<FileType>(null);

  const handleClickInputBox = (e: React.MouseEvent<HTMLDivElement>) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (event) => {
      const { files } = event.target as HTMLInputElement;
      if (!files) return alert('파일이없다는 처리');
      if (files[0].type !== 'application/pdf') {
        alert('pdf가 아니라는 토스트? 모달? 안내');
        return;
      }
      setFile(files[0]);
    };
    fileInput.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile.type !== 'application/pdf') {
      alert('PDF 파일이 아닙니다.');
      return;
    }
    setFile(droppedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        onClick={handleClickInputBox}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        role="button"
        className="p-2 m-auto w-1/2 flex flex-col justify-center items-center gap-2 border-dashed border-2 rounded-sm rounded-bl-xl border-light-blue-6 bg-light-blue-1 text-light-blue-6"
      >
        <Image src="/upload.svg" width={40} height={28} className="mx-auto" alt="upload-button" />
        <span className="text-center">
          {file ? file.name : `마우스로 드래그 하거나 아이콘을 눌러 직접 추가해주세요.`}
        </span>
      </div>
      <Button label={'업로드'} onClick={() => handleSubmit(file)} size="md" />
    </div>
  );
}

export default UploadFile;
