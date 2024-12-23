import { auth } from '@/app/business/services/user/user.query';
import Button from '@/app/ui/view/atom/button/button';
import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

export default async function NavigationItems() {
  const userInfo = await auth();

  return (
    <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 ">
      {userInfo ? (
        <>
          <NavigationItem href={'/my'} label="마이페이지" />
          <NavigationItem href={'/result'} label="결과확인" />
        </>
      ) : (
        <>
          <NavigationItem href={'/sign-in'} label="로그인" />
          <NavigationItem href={'/anonymous'} label="비회원 검사" />
        </>
      )}
      <NavigationItem href={'/tutorial'} label="튜토리얼" />
      <NavigationItem
        target="_black"
        href={'https://soft-anorak-0ca.notion.site/e35e3b210995463fa748f35aab536f2c?pvs=74'}
        label="팀소개"
      />
    </div>
  );
}

interface NavigationItemProps {
  href: string;
  label: string;
  target?: '_black' | '_self' | '_parent' | '_top';
}

export function NavigationItem({ href, label, target }: NavigationItemProps) {
  return (
    <Link href={href} target={target} className="flex items-center justify-between">
      <Button
        size={'xs'}
        className="text-black lg:text-white hover:text-slate-400 py-5 lg:text-base text-lg "
        variant={'text'}
        label={label}
      />
      <ChevronRightIcon className="h-4 w-4 lg:hidden text-black" />
    </Link>
  );
}
