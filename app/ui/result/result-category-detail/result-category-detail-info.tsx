import ResultCategoryDetailContent from '@/app/ui/result/result-category-detail-content/result-category-detail-content';
import {
  CreditResponse,
  LectureInfoResponse,
  ResultCategoryDetailLecturesResponse,
  useFetchCredits,
  useFetchResultCategoryDetailInfo,
} from '@/app/store/querys/result';
import { ResultCategoryKey } from '../result-category-detail-content/result-category-detail-content.stories';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';

const CHAPEL_LECTURE_INFO: LectureInfoResponse = {
  id: 0,
  lectureCode: 'KMA02101',
  name: '채플',
  credit: 0.5,
};

function addChapelToCommonCulture(
  info: ResultCategoryDetailLecturesResponse[],
  chapel?: CreditResponse,
): ResultCategoryDetailLecturesResponse[] {
  if (!chapel) return info;
  const takenChapel = chapel.takenCredit / 0.5;
  const haveToChapel = Math.max(0, 4 - takenChapel);

  return [
    ...info,
    {
      categoryName: '채플',
      completed: takenChapel * 0.5 >= 2.0,
      totalCredit: 2.0,
      takenCredit: takenChapel * 0.5,
      haveToLectures: Array(haveToChapel).fill(CHAPEL_LECTURE_INFO),
      takenLectures: Array(takenChapel).fill(CHAPEL_LECTURE_INFO),
    },
  ];
}

export default function ResultCategoryDetailInfo({ category }: { category: ResultCategoryKey }) {
  const { data: categoryInfo } = useFetchResultCategoryDetailInfo(category);
  const { data: categories } = useFetchCredits();

  const chapel = categories.find((category) => category.category === 'CHAPEL');
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
