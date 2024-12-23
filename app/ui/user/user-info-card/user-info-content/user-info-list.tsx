import { UserInfoResponse } from '@/app/business/services/user/user.type';
import { MAJOR_NOTATION } from '@/app/utils/key/result-category.key';

interface UserInfoListProps {
  data: UserInfoResponse;
}

function UserInfoList({ data }: UserInfoListProps) {
  const { studentNumber, studentName, completeDivision: majors, totalCredit, takenCredit, graduated } = data;

  const displaySeveralMajor = (notation: 'major' | 'title'): React.ReactNode => {
    return majors.map((major, index) => {
      const { major: majorName, majorType } = major;

      return <li key={index}>{notation === 'title' ? MAJOR_NOTATION[majorType] : majorName}</li>;
    });
  };

  return (
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
  );
}

export default UserInfoList;
