import { Table } from '../../view/molecule/table';
import AnnounceMessageBox from '@/app/ui/view/molecule/announce-message-box/announce-massage-box';
import LabelContainer from '@/app/ui/view/atom/label-container/label-container';
import { cn } from '@/app/utils/shadcn/utils';
import { ResultCategoryDetailLecturesResponse } from '@/app/store/querys/result';
import CompletedImage from '@/public/assets/completed-category.png';
import Image from 'next/image';
import searchResultIcon from '@/public/assets/searchResultIcon.svg';

const headerInfo = ['과목코드', '과목명', '학점'];

interface ResultCagegoryDetailLectureProps {
  detailCategory: ResultCategoryDetailLecturesResponse;
  isTakenLecture: boolean;
}

const emptyDataRender = () => {
  return (
    <div className="flex justify-center gap-4 p-6 md:p-12">
      <Image src={searchResultIcon} alt="search-result-icon" width={20} height={20} />
      <span className="text-sm font-medium text-gray-400 text-center whitespace-pre-wrap md:text-base">
        이수한 과목 정보가 존재하지 않습니다.
      </span>
    </div>
  );
};

function ResultCagegoryDetailLecture({ detailCategory, isTakenLecture }: ResultCagegoryDetailLectureProps) {
  const { categoryName, totalCredit, takenCredit, takenLectures, haveToLectures, completed } = detailCategory;

  const showCompleted = !isTakenLecture && completed;
  return (
    <div className={cn('my-4 flex flex-col gap-4 min-h-48', 'md:min-h-60')}>
      <LabelContainer
        label={categoryName}
        rightElement={
          <div className="text-2xl text-gray-7">
            {takenCredit} / {totalCredit}
          </div>
        }
      />
      {showCompleted ? (
        <AnnounceMessageBox message="해당 파트의 졸업요건을 충족하셨습니다!" background_image={CompletedImage} />
      ) : (
        <Table
          headerInfo={headerInfo}
          data={isTakenLecture ? takenLectures : haveToLectures}
          emptyDataRender={emptyDataRender}
          nonRenderableKey={[]}
        />
      )}
    </div>
  );
}

export default ResultCagegoryDetailLecture;
