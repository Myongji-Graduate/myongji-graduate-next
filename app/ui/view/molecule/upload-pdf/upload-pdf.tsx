'use client';
import Image from 'next/image';
import uploadBox from '@/public/assets/upload-box.svg';
import checkedBox from '@/public/assets/checked-box.svg';
import usePdfFile from '@/app/hooks/usePdfFile';
import { ChangeEvent, DragEvent } from 'react';

function UploadPdf() {
  const { file, changeFile } = usePdfFile();

  const handleChangeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) changeFile(files[0]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        role="button"
        className="relative p-2 m-auto w-96 flex flex-col justify-center items-center gap-2 border-dashed border-2 rounded-sm rounded-bl-xl border-light-blue-6 bg-light-blue-1 text-light-blue-6 max-lg:w-80"
      >
        <Image src={file ? checkedBox : uploadBox} width={40} height={28} className="mx-auto" alt="upload-button" />
        <span className="text-center break-keep whitespace-pre-line max-w-48 truncate">
          {file ? file.name : '마우스로 드래그 하거나 아이콘을 눌러 추가해주세요.'}
        </span>
        <input
          onChange={handleChangeFileInput}
          type="file"
          className="absolute bg-black opacity-0 w-96 max-lg:w-80 h-full"
          name="file"
          accept=".pdf"
          data-testid="upload-box"
          required
        />
      </div>
    </div>
  );
}

export default UploadPdf;
