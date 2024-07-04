import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import FindPasswordContainer from './[components]/find-password-container';

function FindPasswordPage() {
  return (
    <ContentContainer>
      <TitleBox title="비밀번호 재설정" />
      <FindPasswordContainer />
    </ContentContainer>
  );
}

export default FindPasswordPage;
