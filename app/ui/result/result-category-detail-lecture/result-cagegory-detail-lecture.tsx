import { Table } from '../../view/molecule/table';
import AnnounceMessageBox from '@/app/ui/view/molecule/announce-message-box/announce-massage-box';
import LabelContainer from '@/app/ui/view/atom/label-container/label-container';
import { cn } from '@/app/utils/shadcn/utils';
import { ResultCategoryDetailLecturesResponse } from '@/app/store/querys/result';
import CompletedImage from '@/public/assets/completed-category.png';

const headerInfo = ['과목코드', '과목명', '학점'];

interface ResultCagegoryDetailLectureProps {
  detailCategory: ResultCategoryDetailLecturesResponse;
  isTakenLecture: boolean;
}

function ResultCagegoryDetailLecture({ detailCategory, isTakenLecture }: ResultCagegoryDetailLectureProps) {
  const { categoryName, totalCredit, takenCredit, takenLectures, haveToLectures, completed } = detailCategory;

  const showCompleted = !isTakenLecture && completed;
  const showNoneLecture = isTakenLecture && takenLectures.length === 0;

  return (
    <div className={cn('my-4 flex flex-col gap-4 min-h-48', 'md:min-h-60')}>
      <LabelContainer
        label={categoryName}
        rightElement={
          <div className="text-2xl text-gray-6">
            {takenCredit} / {totalCredit}
          </div>
        }
      />
      {showCompleted ? (
        <AnnounceMessageBox message="해당 파트의 졸업요건을 충족하셨습니다!" background_image={CompletedImage} />
      ) : (
        <>
          <Table headerInfo={headerInfo} data={isTakenLecture ? takenLectures : haveToLectures} />
          {showNoneLecture && <AnnounceMessageBox message="이수한 과목 정보가 존재하지 않습니다." />}
        </>
      )}
    </div>
  );
}

export default ResultCagegoryDetailLecture;
