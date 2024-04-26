import ResultCategoryCard from '@/app/ui/result/result-category/result-category-card';
import UserInfoCard from '@/app/ui/user/user-info-card/user-info-card';
import ContentContainer from '@/app/ui/view/atom/content-container';
import { cn } from '@/app/utils/shadcn/utils';
import { RESULT_CATEGORY, ResultCategoryKey } from '@/app/utils/key/result-category.key';

function ResultPage() {
  const DUMMY_DATA = {
    category: 'COMMON_CULTURE' as keyof typeof RESULT_CATEGORY,
    totalCredit: 70,
    takenCredit: 68,
    completed: false,
  };

  return (
    <div className="flex justify-center items-end">
      <ContentContainer className="md:w-[700px] p-8">
        <UserInfoCard />
      </ContentContainer>
      <div
        className={cn(
          'absolute grid grid-cols-2 gap-2 top-[30rem] w-full',
          'md:max-w-[700px] md:gap-10 md:top-[33rem]',
        )}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ResultCategoryCard
            key={index}
            category={RESULT_CATEGORY[DUMMY_DATA.category]}
            totalCredit={DUMMY_DATA.totalCredit}
            takenCredit={DUMMY_DATA.takenCredit}
          />
        ))}
      </div>
    </div>
  );
}
export default ResultPage;
