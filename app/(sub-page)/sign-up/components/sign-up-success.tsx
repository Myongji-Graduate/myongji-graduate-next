import Button from '@/app/ui/view/atom/button/button';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import Link from 'next/link';

// 내용이랑 스타일은 mock인 상태입니다.
export default function SignUpSuccess() {
  return (
    <>
      <TitleBox title={'회원가입 완료'} />
      <div className="h-[260px] text-2xl font-bold  flex flex-col items-center justify-center space-y-2">
        <div>회원가입이 완료되었습니다</div>
        <div className="text-xl font-medium">로그인 후 졸업 사정 결과를 확인해보세요!</div>
        <div className="pt-6">
          <Link href="/sign-in">
            <Button size={'md'} label={'로그인 하기'} />
          </Link>
        </div>
      </div>
    </>
  );
}
