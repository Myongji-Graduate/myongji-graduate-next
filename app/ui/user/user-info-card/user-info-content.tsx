import { UserInfoResponse } from '@/app/business/services/user/user.type';
import { MAJOR_NOTATION } from '@/app/utils/key/result-category.key';
import React from 'react';
import { getPercentage } from '@/app/utils/chart.util';
import UserInfoMessage from './user-info-message';
import { CreditResponse } from '@/app/store/querys/result';
import dynamic from 'next/dynamic';

const PieChart = dynamic(() => import('../../view/molecule/pie-chart/pie-chart'), { ssr: false });

interface UserInfoContentProps {
  data: UserInfoResponse;
  categories: CreditResponse[];
}

async function UserInfoContent({ data, categories }: UserInfoContentProps) {
  const { studentNumber, studentName, completeDivision: majors, totalCredit, takenCredit, graduated } = data;

  const remainCredit = categories.reduce((accumulator, category) => {
    const { category: categoryName, totalCredit, takenCredit } = category;
    if (categoryName === 'CHAPEL') return accumulator;
    const categoryRemainCredit = totalCredit - takenCredit < 0 ? 0 : totalCredit - takenCredit;
    return accumulator + categoryRemainCredit;
  }, 0);

  const percentage = getPercentage(totalCredit - remainCredit, totalCredit);

  const displaySeveralMajor = (notation: 'major' | 'title'): React.ReactNode => {
    return majors.map((major, index) => {
      const { major: majorName, majorType } = major;

      return <li key={index}>{notation === 'title' ? MAJOR_NOTATION[majorType] : majorName}</li>;
    });
  };

  return (
    <>
      <UserInfoMessage studentName={studentName} remainCredit={remainCredit} />
      <div className="flex border-t-2 md:my-4 mt-4 py-4 justify-between items-center">
        <div className="flex font-medium text-xs md:text-lg gap-4 md:gap-14 ">
          <ul className="text-gray-7 flex flex-col gap-1">
            <li>이름</li>
            <li>학번</li>
            {displaySeveralMajor('title')}
            <li>졸업최소학점</li>
            <li>현재이수학점</li>
            <li>졸업가능여부</li>
          </ul>
          <ul className="flex flex-col gap-1">
            <li>{studentNumber}</li>
            <li>{studentName}</li>
            {displaySeveralMajor('major')}
            <li>{totalCredit}</li>
            <li>{takenCredit}</li>
            <li>{graduated ? '가능' : '불가능'}</li>
          </ul>
        </div>
        <div className="mr-[10%]">
          <PieChart percentage={percentage} />
        </div>
      </div>
      <p className="text-gray-6 md:text-xs text-[10px]">
        * 서비스의 결과는 공식적인 효력을 갖지 않습니다. 정확한 졸업사정결과는 소속 단과대 교학팀에서의 확인을
        권장합니다.
      </p>
    </>
  );
}

export default UserInfoContent;
