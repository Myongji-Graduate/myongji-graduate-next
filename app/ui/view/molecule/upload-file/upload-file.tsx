'use client';

import Image from 'next/image';
import uploadBox from '@/public/assets/upload-box.svg';
import checkedBox from '@/public/assets/checked-box.svg';
import useFile from '@/app/hooks/useFile';
import { ChangeEvent } from 'react';

function UploadFile() {
  const { file, changeFile } = useFile();

  const handleClickInputBox = (event: ChangeEvent) => {
    const { files } = event.target as HTMLInputElement;
    if (files) changeFile(files[0]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const targetFile = event.dataTransfer.files[0];
    changeFile(targetFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative flex flex-col items-center gap-8">
      <input
        type="file"
        className="absolute opacity-0 h-full bg-black w-full"
        name="file"
        accept=".pdf"
        onChange={handleClickInputBox}
        required
      />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        role="button"
        className="p-2 m-auto w-96 flex flex-col justify-center items-center gap-2 border-dashed border-2 rounded-sm rounded-bl-xl border-light-blue-6 bg-light-blue-1 text-light-blue-6 max-lg:w-80 "
      >
        <Image src={file ? checkedBox : uploadBox} width={40} height={28} className="mx-auto" alt="upload-button" />
        <span className="text-center">
          {file ? (
            file.name
          ) : (
            <>
              마우스로 드래그 하거나 <br />
              아이콘을 눌러 추가해주세요.
            </>
          )}
        </span>
      </div>
    </div>
  );
}

export default UploadFile;
