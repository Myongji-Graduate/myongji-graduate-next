import { fetchUser } from '@/app/business/services/user/user.query';
import { fetchTakenLectures } from '@/app/business/services/lecture/taken-lecture.query';
import books from '@/public/assets/books.png';
import pencil from '@/public/assets/pencil.png';
import Image from 'next/image';

export default async function UserCreditResult() {
  //userInfo로만 가져올 수 있을 것 같음. 추후 확인 필요
  const [userInfo, taken] = await Promise.all([fetchUser(), fetchTakenLectures()]);

  return (
    <div className="flex justify-between items-center bg-zinc-100 min-h-20 rounded-lg py-1 px-8 gap-3">
      <div className="relative sm:h-20 sm:w-20 h-14 w-14">
        <Image src={pencil} alt="pencil" layout="fill" />
      </div>
      <p className="z-1 text-sm md:text-base lg:text-lg">
        {userInfo.studentName}님, 총 기준학점 중 <span className="text-point-blue">{taken.totalCredit}</span>학점을
        수강하셨습니다!
      </p>
      <div className="relative sm:h-20 sm:w-20 h-14 w-14">
        <Image src={books} alt="books" layout="fill" />
      </div>
    </div>
  );
}
