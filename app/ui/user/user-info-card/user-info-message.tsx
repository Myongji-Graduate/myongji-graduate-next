interface UserInfoMessageProps {
  studentName: string;
  graduated: boolean;
  remainCredit: number;
}

const graduateType = {
  GRADUATED: 'GRADUATED',
  STUDENT: 'STUDENT',
  CANDIDATE: 'CANDIDATE',
} as const;

function UserInfoMessage({ studentName, graduated, remainCredit }: UserInfoMessageProps) {
  const graduateLevel = () => {
    if (graduated) return graduateType.GRADUATED;
    return remainCredit > 0 ? graduateType.STUDENT : graduateType.CANDIDATE;
  };

  const graduate_message = {
    GRADUATED: '졸업을 축하합니다 !',
    CANDIDATE: '모든 영역의 기준학점을 달성해주세요.',
    STUDENT: (
      <>
        졸업필요학점보다
        <span data-cy="remain-credit" className="text-point-blue ml-1">
          {remainCredit}
        </span>
        학점이 부족합니다.
      </>
    ),
  } as const;

  return (
    <p className="font-bold text-sm md:text-xl">
      {studentName}님, {graduate_message[graduateLevel()]}
    </p>
  );
}

export default UserInfoMessage;
