import ResultCategoryDetailContent from '@/app/ui/result/result-category-detail-content/result-category-detail-content';
import {
  CreditResponse,
  ResultCategoryDetailLecturesResponse,
  ResultCategoryDetailResponse,
  useFetchCredits,
  useFetchResultCategoryDetailInfo,
} from '@/app/store/querys/result';
import { ResultCategoryKey } from '../result-category-detail-content/result-category-detail-content.stories';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';

const CHAPEL_TOTAL_CREDIT = 2.0;
const CHAPEL_TOTAL_COUNT = 4;
const CHAPEL_CREDIT = CHAPEL_TOTAL_CREDIT / CHAPEL_TOTAL_COUNT;

const CHAPEL_LECTURE_INFO = {
  id: 'KMA02101',
  name: '채플',
  credit: CHAPEL_CREDIT,
};

function addChapelToCommonCulture(
  info: ResultCategoryDetailLecturesResponse[],
  chapel?: CreditResponse,
): ResultCategoryDetailLecturesResponse[] {
  if (!chapel) return info;
  const takenChapelCount = chapel.takenCredit / CHAPEL_CREDIT;
  const haveToChapelCount = Math.max(0, CHAPEL_TOTAL_COUNT - takenChapelCount);

  return [
    ...info,
    {
      categoryName: '채플',
      completed: takenChapelCount >= CHAPEL_TOTAL_COUNT,
      totalCredit: CHAPEL_TOTAL_CREDIT,
      takenCredit: chapel.takenCredit,
      haveToLectures: Array(haveToChapelCount).fill(CHAPEL_LECTURE_INFO),
      takenLectures: Array(takenChapelCount).fill(CHAPEL_LECTURE_INFO),
    },
  ];
}

interface ResultCategoryDetailInfoProp {
  category: ResultCategoryKey;
}

interface ResultCategoryDetailInfoViewerProps extends ResultCategoryDetailInfoProp {
  categories: CreditResponse[];
  categoryInfo: ResultCategoryDetailResponse;
}

export function ResultCategoryDetailInfoViewer({
  categories,
  categoryInfo,
  category,
}: ResultCategoryDetailInfoViewerProps) {
  const chapel = categories.find(({ category }) => category === 'CHAPEL');
  const isCommonCulture = category === RESULT_CATEGORY.COMMON_CULTURE;
  const detailCategory = isCommonCulture
    ? addChapelToCommonCulture(categoryInfo.detailCategory, chapel)
    : categoryInfo.detailCategory;

  return (
    <ResultCategoryDetailContent
      takenCredit={categoryInfo.takenCredit}
      totalCredit={categoryInfo.totalCredit}
      detailCategory={detailCategory}
      category={category}
    />
  );
}

export default function ResultCategoryDetailInfo({ category }: ResultCategoryDetailInfoProp) {
  const { data: categoryInfo } = useFetchResultCategoryDetailInfo(category);
  const { data: categories } = useFetchCredits();

  return <ResultCategoryDetailInfoViewer category={category} categories={categories} categoryInfo={categoryInfo} />;
}
