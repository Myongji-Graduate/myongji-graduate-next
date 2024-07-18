import Button from '@/app/ui/view/atom/button/button';
import Link from 'next/link';
interface FindIdSuccessProps {
  authId: string | undefined;
}
export default function FindIdSuccess({ authId }: FindIdSuccessProps) {
  return (
    <div className=" flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-2">
          <p className="text-gray-500 text-center">입력하신 정보와 일치하는 아이디입니다.</p>
        </div>
        <div className="p-8 px-20 bg-light-blue-1 text-point-blue rounded-lg text-center">{authId}</div>
        <div className="space-y-4">
          <div className="flex justify-center gap-4">
            <Link href="/sign-in">
              <Button size="sm" label={'로그인 하기'} />
            </Link>
            <Link href="/find-password">
              <Button size="sm" label={'비밀번호 바꾸기'} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
