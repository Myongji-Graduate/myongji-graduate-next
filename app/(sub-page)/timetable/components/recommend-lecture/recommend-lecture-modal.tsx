import Image from 'next/image';
import RecommendLectureContainer from './recommend-lecture-container';
import { auth } from '@/app/business/services/user/user.query';
import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/services/user/user.type';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import Modal from '@/app/ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { RecommendLectureData } from '@/app/business/services/timetable/recommend-lecture.type';
import Responsive from '@/app/ui/responsive';
import UserCreditResult from '@/app/ui/user/user-credit-result/user-credit-result';
import UserCreditResultSkeleton from '@/app/ui/user/user-credit-result/user-credit-result-skeleton';
import { Suspense } from 'react';

async function RecommendLectureModal() {
  const recommendLectureData: RecommendLectureData = {
    semestersLeft: 3,
    semesters: [
      {
        label: '3-2',
        creditTarget: 18,
        lectures: [
          { id: 1, lectureCode: 'CSE1001', name: '컴퓨터 공학 개론', credit: 3 },
          { id: 2, lectureCode: 'MAT2001', name: '이산수학', credit: 3 },
        ],
      },
      {
        label: '4-1',
        creditTarget: 21,
        lectures: [
          { id: 12, lectureCode: 'CSE1001', name: '컴퓨터 공학 개론', credit: 3 },
          { id: 24, lectureCode: 'MAT2001', name: '이산수학', credit: 3 },
        ],
      },
      {
        label: '4-2',
        creditTarget: 21,
        lectures: [
          { id: 123, lectureCode: 'CSE1001', name: '컴퓨터 공학 개론', credit: 3 },
          { id: 52, lectureCode: 'MAT2001', name: '이산수학', credit: 3 },
        ],
      },
    ],
  };

  const user = (await auth()) as InitUserInfoResponse | UserInfoResponse;

  const ModalContent = () => {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-shrink-0 p-4 flex flex-col gap-4">
          <TitleBox title="학기별 시간표 과목 추천">
            <p>아직 듣지 않은 과목으로 남은 학기별 시간표를 자동으로 추천해드려요.</p>
          </TitleBox>
          <Suspense fallback={<UserCreditResultSkeleton />}>
            <UserCreditResult semestersLeft={recommendLectureData.semestersLeft} />
          </Suspense>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {recommendLectureData.semestersLeft === 0 ? (
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
            <RecommendLectureContainer semesters={recommendLectureData.semesters} />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Responsive minWidth={570}>
        <Modal modalKey={DIALOG_KEY.RECOMMEND_LECTURE}>
          <div className="flex flex-col gap-5 md:gap-6 pb-4 md:pb-6 w-[800px] max-lg:w-[450px] h-[60vh] lg:h-[80vh]">
            <ModalContent />
          </div>
        </Modal>
      </Responsive>
      <Responsive maxWidth={569}>
        <Modal modalKey={DIALOG_KEY.RECOMMEND_LECTURE}>
          <div className="flex flex-col gap-5 md:gap-6 pb-4 md:pb-6 w-[70vw] h-[60vh]">
            <ModalContent />
          </div>
        </Modal>
      </Responsive>
    </>
  );
}

export default RecommendLectureModal;
