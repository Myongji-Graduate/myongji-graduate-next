import Link from 'next/link';

function AuthOptionContainer() {
  return (
    <div className="text-gray-6 flex gap-2">
      <div className="after:content-['|'] after:pl-2">
        <Link href="/find-id">아이디 찾기</Link>
      </div>
      <div className="after:content-['|'] after:pl-2">
        <Link href="/find-password">비밀번호 재설정</Link>
      </div>
      <Link href="/sign-up">회원가입하기</Link>
    </div>
  );
}

export default AuthOptionContainer;
