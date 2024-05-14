import UserCreditResult from '@/app/ui/user/user-credit-result/user-credit-result';
import UserCreditResultSkeleton from '@/app/ui/user/user-credit-result/user-credit-result-skeleton';
import Button from '@/app/ui/view/atom/button/button';
import Link from 'next/link';
import React, { Suspense } from 'react';

export default function MyResultContainer() {
  return (
    <div className="flex flex-col  justify-center gap-10">
      <p className="font-bold sm:text-3xl text-2xl ml-1 sm:ml-0">마이페이지</p>
      <Suspense fallback={<UserCreditResultSkeleton />}>
        <UserCreditResult />
      </Suspense>
      <div className="flex justify-center">
        <Link href="/result">
          <Button label="수강현황 자세히 보기" variant="primary" size="xs" />
        </Link>
      </div>
    </div>
  );
}
