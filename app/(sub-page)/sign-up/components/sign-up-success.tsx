import Button from '@/app/ui/view/atom/button/button';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import Link from 'next/link';
import Image from 'next/image';
import maru from '../../../../public/assets/maru.png';
export default function SignUpSuccess() {
  return (
    <>
      <TitleBox title={'회원가입 완료'} />
      <div className="text-2xl font-bold flex flex-col items-center justify-center space-y-2">
        <Image src={maru} width={150} height={150} alt="main-book-background" className="max-md:w-24 mt-8" />
        <div className="text-base md:text-lg font-light">이제 졸업 사정 결과를 확인해보세요!</div>
        <div className="pt-6">
          <Link href="/sign-in">
            <Button size={'md'} label={'로그인 하기'} />
          </Link>
        </div>
      </div>
    </>
  );
}
