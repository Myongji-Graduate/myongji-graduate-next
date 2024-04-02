import Button from '@/app/ui/view/atom/button/button';
import Link from 'next/link';

// 내용이랑 스타일은 mock인 상태입니다.
export default function SignUpSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight">Youre all set.</h2>
          <p className="text-gray-500">
            Thanks for signing up! We just need to verify your email address to complete the process.
          </p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Link className="inline-block w-full" href="/sign-in">
              <Button className="w-full" label={'로그인 하기'} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
