import { UserInfoResponse } from '@/app/business/services/user/user.type';
import React from 'react';
import PieChart from '../../../view/molecule/pie-chart/pie-chart';
import { getPercentage } from '@/app/utils/calculate.util';
import UserInfoMessage from './user-info-message';
import { CreditResponse } from '@/app/store/querys/result';
import UserInfoList from './user-info-list';

interface UserInfoContentViewerProps {
  data: UserInfoResponse;
  categories: CreditResponse[];
}

export const getRemainCredit = (categories: CreditResponse[]) => {
  return categories.reduce((accumulator, category) => {
    const { category: categoryName, totalCredit, takenCredit } = category;
    if (categoryName === 'CHAPEL') return accumulator;
    const categoryRemainCredit = totalCredit - takenCredit < 0 ? 0 : totalCredit - takenCredit;
    return accumulator + categoryRemainCredit;
  }, 0);
};

function UserInfoContentViewer({ data, categories }: UserInfoContentViewerProps) {
  const { studentName, totalCredit } = data;

  const remainCredit = getRemainCredit(categories);
  const percentage = getPercentage(totalCredit - remainCredit, totalCredit);

  return (
    <>
      <UserInfoMessage studentName={studentName} remainCredit={remainCredit} />
      <div className="flex border-t-2 md:my-4 mt-4 py-4 justify-between items-center">
        <UserInfoList data={data} />
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

export default UserInfoContentViewer;
