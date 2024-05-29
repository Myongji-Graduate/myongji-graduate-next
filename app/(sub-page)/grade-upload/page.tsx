import ContentContainer from '../../ui/view/atom/content-container/content-container';
import Manual from './components/manual';
import UploadTakenLecture from '../../ui/lecture/upload-taken-lecture/upload-taken-lecture';

export default function GradeUploadPage() {
  return (
    <ContentContainer className="flex flex-col justify-center gap-8 min-h-[70vh]">
      <Manual />
      <UploadTakenLecture />
    </ContentContainer>
  );
}
