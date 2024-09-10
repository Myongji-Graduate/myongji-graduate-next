import ContentContainer from '@/app/ui/view/atom/content-container/content-container';

import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import Image from 'next/image';
import MaruImage from '@/public/assets/mju-maru.jpg';
import Separator from '@/app/ui/view/atom/separator';
import Button from '@/app/ui/view/atom/button/button';
import Responsive from '@/app/ui/responsive';
import Link from 'next/link';
import type { Metadata } from 'next';
import SignInFormContainer from './components/sign-in-form-container';

export const metadata: Metadata = {
  title: '로그인',
  description: '졸업을 부탁해에 로그인 하고 졸업요건을 간편하게 검사해 보세요.',
};

export default function SignInPage() {
  return (
    <ContentContainer className="md:w-[768px] h-[550px] xl:w-[960px] flex p-9">
      <Responsive minWidth={767}>
        <div className="w-2/4">
          <Image className="object-cover h-full" src={MaruImage} alt="마루" />
        </div>
      </Responsive>
      <div className="w-full md:w-2/4 md:pl-7 ">
        <div className="pb-12">
          <TitleBox title={'로그인'} />
        </div>
        <SignInFormContainer />
        <div className="flex mt-12 space-x-4 h-6 items-center justify-center">
          <Link href={'/find-id'}>
            <Button className="text-xs" label="아이디 찾기" variant={'text'} />
          </Link>
          <Separator orientation={'vertical'} />
          <Link href={'/find-password'}>
            <Button className="text-xs" label="비밀번호 재설정" variant={'text'} />
          </Link>
          <Separator orientation={'vertical'} />
          <Link href={'/sign-up'}>
            <Button className="text-xs" label="회원가입" variant={'text'} />
          </Link>
        </div>
      </div>
    </ContentContainer>
  );
}
