'use client';
import { useFetchCredits } from '@/app/store/querys/result';

interface UserInfoMessageProps {
  studentName: string;
}

function UserInfoMessage({ studentName }: UserInfoMessageProps) {
  const { data: categories } = useFetchCredits();

  const remainCredit = categories.reduce((accumulator, category) => {
    if (category.category === 'CHAPEL') return accumulator;

    return accumulator + (category.totalCredit - category.takenCredit);
  }, 0);

  return (
    <p className="font-bold text-sm md:text-xl">
      {studentName}님,
      {remainCredit > 0 ? (
        <>
          졸업필요학점보다
          <span data-cy="remain-credit" className="text-point-blue ml-1">
            {remainCredit}
          </span>
          학점이 부족합니다.
        </>
      ) : (
        '졸업을 축하합니다 !'
      )}
    </p>
  );
}

export default UserInfoMessage;
