import ContentContainer from '../../ui/view/atom/content-container';
import Manual from './components/manual';
import UploadGradeCard from '../../ui/lecture/upload-taken-lecture/upload-grade-card';

export default function GradeUploadPage() {
  return (
    <ContentContainer className="flex flex-col justify-center gap-8 min-h-[70vh]">
      <Manual />
      <UploadGradeCard />
    </ContentContainer>
  );
}
