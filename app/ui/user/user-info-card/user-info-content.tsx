import { UserInfoResponse } from '@/app/business/user/user.type';
import { MAJOR_NOTATION } from '@/app/utils/key/result-category.key';
import React from 'react';
import PieChart from '../../view/molecule/pie-chart/pie-chart';
import { getPercentage } from '@/app/utils/chart.util';

interface UserInfoContentProps {
  data: UserInfoResponse;
}

function UserInfoContent({ data }: UserInfoContentProps) {
  const { studentNumber, studentName, completionDivision: majors, totalCredit, takenCredit, graduated } = data;

  const percentage = getPercentage(takenCredit, totalCredit);

  const displaySeveralMajor = (notation: 'major' | 'title'): React.ReactNode => {
    return majors.map((major, index) => {
      const { major: majorName, majorType } = major;

      return <li key={index}>{notation === 'title' ? MAJOR_NOTATION[majorType] : majorName}</li>;
    });
  };

  return (
    <>
      <p className="font-bold text-sm md:text-xl">
        졸업필요학점보다{' '}
        <span data-cy="remain-credit" className="text-point-blue">
          {totalCredit - takenCredit}
        </span>
        학점이 부족합니다.
      </p>
      <div className="flex border-t-2 my-4 py-4 justify-between items-center">
        <div className="flex font-medium text-xs md:text-lg gap-4 md:gap-14 ">
          <ul className="text-gray-6 flex flex-col gap-1">
            <li>이름</li>
            <li>학번</li>
            {displaySeveralMajor('title')}
            <li>졸업필요학점</li>
            <li>총 이수 학점</li>
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
