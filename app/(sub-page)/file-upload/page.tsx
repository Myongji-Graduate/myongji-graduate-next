import UploadFile from '@/app/ui/view/molecule/upload-file';
import ContentContainer from '../../ui/view/atom/content-container';
import Manual from './components/manual';

export default function Page() {
  return (
    <ContentContainer className="grid place-items-center min-h-[70vh]">
      <div className="flex flex-col gap-12">
        <Manual />
        <UploadFile />
      </div>
    </ContentContainer>
  );
}
