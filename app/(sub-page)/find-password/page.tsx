import FindPasswordForm from '@/app/ui/user/find-password-from/find-password-form';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';

function FindPasswordPage() {
  return (
    <ContentContainer>
      <TitleBox title="비밀번호 재설정" />
      <FindPasswordForm />
    </ContentContainer>
  );
}

export default FindPasswordPage;
