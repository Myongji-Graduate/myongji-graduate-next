import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import FindIdContainer from './[components]/find-id-container';

function FindIdPage() {
  return (
    <ContentContainer>
      <TitleBox title="아이디 찾기" />
      <FindIdContainer />
    </ContentContainer>
  );
}

export default FindIdPage;
