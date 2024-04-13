import { Table } from '../../view/molecule/table';
import CompletedCategory from '@/app/(sub-page)/result/components/completed-category';
import { ResultCategoryDetailLectures } from '@/app/business/result/result.query';
import LabelContainer from '@/app/ui/view/atom/label-container/label-container';

const headerInfo = ['과목코드', '과목명', '학점'];

interface ResultCagegoryDetailLectureProps {
  detailCategory: ResultCategoryDetailLectures;
  isTakenLecture: boolean;
}

function ResultCagegoryDetailLecture({ detailCategory, isTakenLecture }: ResultCagegoryDetailLectureProps) {
  const { categoryName, totalCredits, takenCredits, takenLectures, haveToLectures, completed } = detailCategory;

  const showCompleted = !isTakenLecture && completed;

  return (
    <div className="my-4 flex flex-col gap-4">
      <LabelContainer
        label={categoryName}
        rightElement={
          <div className="text-2xl text-gray-6">
            {takenCredits} / {totalCredits}
          </div>
        }
      />
      {showCompleted ? (
        <CompletedCategory />
      ) : (
        <Table headerInfo={headerInfo} data={isTakenLecture ? takenLectures : haveToLectures} />
      )}
    </div>
  );
}

export default ResultCagegoryDetailLecture;
