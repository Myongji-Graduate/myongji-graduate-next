import Image from 'next/image';
import RecommendLectureContainer from './recommend-lecture-container';
import EmptyGradeState from '../empty-grade-state/empty-grade-state';
import { auth } from '@/app/business/services/user/user.query';
import { isInitUser } from '@/app/business/services/user/user.validation';
import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/services/user/user.type';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';

async function RecommendLecture() {
  const remainSemester: number = 2; // 추후 API에서 받아오기

  const user = (await auth()) as InitUserInfoResponse | UserInfoResponse;
  const isInit = isInitUser(user);

  return (
    <div className="flex flex-col gap-5 md:gap-6  pb-4 md:pb-6">
      <TitleBox title="학기별 시간표 과목 추천">
        <p>아직 듣지 않은 과목으로 남은 학기별 시간표를 자동으로 추천해드려요.</p>
      </TitleBox>
      {isInit ? (
        <EmptyGradeState />
      ) : (
        <>
          <p className="text-lg md:text-xl text-center font-bold text-gray-500">
            {user.studentName}님, 앞으로 {remainSemester}학기 남았습니다!
          </p>
          {remainSemester === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/assets/graduate-maru.png"
                alt="학사모 마루 이미지"
                className="mb-4"
                width={250}
                height={250}
              />
            </div>
          ) : (
            <RecommendLectureContainer />
          )}
        </>
      )}
    </div>
  );
}

export default RecommendLecture;
