import SignInForm from '@/app/ui/user/sign-in-form/sign-in-form';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import Image from 'next/image';
import MaruImage from '@/public/assets/mju-maru.jpg';

export default function Page() {
  return (
    <ContentContainer className="md:w-[768px] h-[550px] xl:w-[960px] flex p-9">
      <div className="w-2/4">
        <Image className="object-cover h-full" src={MaruImage} alt="마루" />
      </div>
      <div className="w-2/4 pl-7 ">
        <div className="pb-16">
          <TitleBox title={'로그인'} />
        </div>
        <SignInForm />
      </div>
    </ContentContainer>
  );
}
