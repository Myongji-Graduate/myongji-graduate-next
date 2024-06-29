import FindIdForm from '@/app/ui/user/find-id-form/find-id-form';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';

function FindIdPage() {
  return (
    <ContentContainer>
      <TitleBox title="아이디 찾기" />
      <FindIdForm />
    </ContentContainer>
  );
}

export default FindIdPage;
