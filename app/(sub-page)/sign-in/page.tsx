import SignInForm from '@/app/ui/user/sign-in-form/sign-in-form';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import Image from 'next/image';
import MaruImage from '@/public/assets/mju-maru.jpg';
import Separator from '@/app/ui/view/atom/separator';
import Button from '@/app/ui/view/atom/button/button';

export default function Page() {
  return (
    <ContentContainer className="md:w-[768px] h-[550px] xl:w-[960px] flex p-9">
      <div className="w-2/4">
        <Image className="object-cover h-full" src={MaruImage} alt="마루" />
      </div>
      <div className="w-2/4 pl-7 ">
        <div className="pb-12">
          <TitleBox title={'로그인'} />
        </div>
        <SignInForm />
        <div className="flex mt-12 space-x-4 h-6 items-center justify-center">
          <Button className="text-xs" label="아이디 찾기" variant={'text'} />
          <Separator orientation={'vertical'} />
          <Button className="text-xs" label="비밀번호 재설정" variant={'text'} />
          <Separator orientation={'vertical'} />
          <Button className="text-xs" label="회원가입 하기" variant={'text'} />
        </div>
      </div>
    </ContentContainer>
  );
}
