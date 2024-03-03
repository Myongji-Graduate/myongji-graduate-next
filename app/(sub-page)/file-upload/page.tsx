'use client';

import ContentContainer from '../../ui/view/atom/content-container';
import Manual from './components/manual';
import Button from '@/app/ui/view/atom/button/button';
import useFile from '@/app/hooks/useFile';
import UploadFile from '@/app/ui/view/molecule/upload-file/upload-file';

export default function FileUploadPage() {
  const { file, changeFile } = useFile();

  const handleClickSubmit = () => {
    console.log('api 연결 (lamda, ec2)');
    console.log('전역 상태 변경 (isRegistered)');
  };

  return (
    <ContentContainer className="grid place-items-center min-h-[70vh]">
      <div className="grid place-items-center gap-8">
        <Manual />
        <UploadFile file={file} changeFile={changeFile} />
        <Button onClick={handleClickSubmit} label={'결과 보러가기'} size="md" />
      </div>
    </ContentContainer>
  );
}
