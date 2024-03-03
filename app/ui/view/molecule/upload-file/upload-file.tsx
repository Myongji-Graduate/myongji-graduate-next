import Image from 'next/image';
import uploadBox from '@/public/assets/upload-box.svg';
import checkedBox from '@/public/assets/checked-box.svg';
import { FileType } from '@/app/hooks/useFile';

interface UploadFileProps {
  file: FileType;
  changeFile: (file: File) => void;
}

function UploadFile({ file, changeFile }: UploadFileProps) {
  const handleClickInputBox = () => {
    const $input = document.createElement('input');
    $input.type = 'file';
    $input.onchange = (event) => {
      const { files } = event.target as HTMLInputElement;
      if (files) changeFile(files[0]);
    };
    $input.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    changeFile(file);
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
