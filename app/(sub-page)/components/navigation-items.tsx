import { auth } from '@/app/business/services/user/user.query';
import Button from '@/app/ui/view/atom/button/button';
import Link from 'next/link';

export default async function NavigationItems() {
  const userInfo = await auth();

  return (
    <div className="flex">
      {userInfo ? (
        <>
          <NavigationItem href={'/my'} label="마이페이지" />
          <NavigationItem href={'/result'} label="결과확인" />
        </>
      ) : (
        <NavigationItem href={'/sign-in'} label="로그인" />
      )}
      <NavigationItem href={'/tutorial'} label="튜토리얼" />
      <NavigationItem href={'/'} label="팀소개" />
    </div>
  );
}

type NavigationItemProps = {
  href: string;
  label: string;
};

export function NavigationItem({ href, label }: NavigationItemProps) {
  return (
    <Link href={href}>
      <Button size={'xs'} className="text-white hover:text-slate-400" variant={'text'} label={label} />
    </Link>
  );
}
