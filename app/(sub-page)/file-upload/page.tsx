import ContentContainer from '../../ui/view/atom/content-container';
import Manual from './components/manual';
import UploadForm from './components/upload-form';

export default function FileUploadPage() {
  return (
    <ContentContainer className="flex flex-col gap-8 min-h-[70vh]">
      <Manual />
      <UploadForm />
    </ContentContainer>
  );
}
