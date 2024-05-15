import { Table } from '../../view/molecule/table';
import AnnounceMessageBox from '@/app/ui/view/molecule/announce-message-box/announce-massage-box';
import LabelContainer from '@/app/ui/view/atom/label-container/label-container';
import { cn } from '@/app/utils/shadcn/utils';
import { ResultCategoryDetailLectures } from '@/app/business/result/result.type';

const headerInfo = ['과목코드', '과목명', '학점'];

interface ResultCagegoryDetailLectureProps {
  detailCategory: ResultCategoryDetailLectures;
  isTakenLecture: boolean;
}

function ResultCagegoryDetailLecture({ detailCategory, isTakenLecture }: ResultCagegoryDetailLectureProps) {
  const { categoryName, totalCredits, takenCredits, takenLectures, haveToLectures, completed } = detailCategory;

  const showCompleted = !isTakenLecture && completed;

  return (
    <div className={cn('my-4 flex flex-col gap-4 min-h-48', 'md:min-h-60')}>
      <LabelContainer
        label={categoryName}
        rightElement={
          <div className="text-2xl text-gray-6">
            {takenCredits} / {totalCredits}
          </div>
        }
      />
      {showCompleted ? (
        <AnnounceMessageBox message="해당 파트의 졸업요건을 충족하셨습니다!" />
      ) : (
        <Table headerInfo={headerInfo} data={isTakenLecture ? takenLectures : haveToLectures} />
      )}
    </div>
  );
}

export default ResultCagegoryDetailLecture;
