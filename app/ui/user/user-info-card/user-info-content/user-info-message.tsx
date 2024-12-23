interface UserInfoMessageProps {
  studentName: string;
  remainCredit: number;
}

function UserInfoMessage({ studentName, remainCredit }: UserInfoMessageProps) {
  return (
    <p className="font-bold text-sm md:text-xl">
      <span className="mr-1">{studentName}님,</span>
      {remainCredit > 0 ? (
        <>
          졸업까지
          <span data-cy="remain-credit" className="text-point-blue ml-1">
            {remainCredit}
          </span>
          학점 남았어요.
        </>
      ) : (
        '졸업을 축하합니다 !'
      )}
    </p>
  );
}

export default UserInfoMessage;
