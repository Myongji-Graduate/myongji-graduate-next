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
  const {
    categoryName,
    totalCredit,
    takenCredit,
    takenLectures,
    haveToLectures,
    mandatoryLectures = [],
    mandatoryOptions = [],
    completed,
  } = detailCategory;
  const optionLectureIds = new Set(
    mandatoryOptions.flatMap((option) => option.candidates.map((lecture) => lecture.id)),
  );
  const requiredLectures = haveToLectures.filter((lecture) => !optionLectureIds.has(lecture.id));
  const mandatoryLectureIds = new Set(mandatoryLectures.map((lecture) => lecture.id));
  const decorateLecture = (lecture: (typeof takenLectures)[number], index: number) => ({
    lecture: mandatoryLectureIds.has(lecture.id) ? { ...lecture, mandatoryMark: '필수' } : lecture,
    index,
    isMandatory: mandatoryLectureIds.has(lecture.id),
  });
  const sortMandatoryFirst = <T extends { isMandatory: boolean; index: number }>(lectures: T[]) =>
    lectures.sort((left, right) => Number(right.isMandatory) - Number(left.isMandatory) || left.index - right.index);
  const displayTakenLectures = sortMandatoryFirst(takenLectures.map(decorateLecture)).map(({ lecture }) => lecture);
  const displayRequiredLectures = sortMandatoryFirst(requiredLectures.map(decorateLecture)).map(
    ({ lecture }) => lecture,
  );

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
        <>
          {!isTakenLecture &&
            mandatoryOptions.map((option) => (
              <section className="overflow-hidden rounded-lg border border-blue-200 bg-blue-50" key={option.name}>
                <div className="flex items-start justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                        택{option.requiredCount}
                      </span>
                      <p className="font-semibold text-gray-900">{option.name}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      아래 {option.candidates.length}개 과목 중 {option.requiredCount}개를 선택해 이수하세요.
                    </p>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm font-semibold text-point-blue">
                    현재 {option.takenCount} / {option.requiredCount}개
                  </span>
                </div>
                <div className="bg-white">
                  <Table
                    headerInfo={headerInfo}
                    data={option.candidates}
                    emptyDataRender={emptyDataRender}
                    nonRenderableKey={[]}
                  />
                </div>
              </section>
            ))}
          {isTakenLecture || requiredLectures.length > 0 || mandatoryOptions.length === 0 ? (
            <Table
              headerInfo={headerInfo}
              data={isTakenLecture ? displayTakenLectures : displayRequiredLectures}
              emptyDataRender={emptyDataRender}
              nonRenderableKey={['mandatoryMark']}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export default ResultCagegoryDetailLecture;
