import ResultCategoryCard from '@/app/ui/result/result-category-card/result-category-card';
import UserInfoCard from '@/app/ui/user/user-info-card/user-info-card';
import ContentContainer from '@/app/ui/view/atom/content-container';
import { cn } from '@/app/utils/shadcn/utils';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';
import ResultCategoryDetail from '@/app/ui/result/result-category-detail/result-category-detail';
import { fetchCredits } from '@/app/business/result/result.query';

interface ResultPageProp {
  searchParams: { category: string };
}

async function ResultPage({ searchParams }: ResultPageProp) {
  const categorys = await fetchCredits();

  const { category } = searchParams;

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
        {categorys.map((category, index) => (
          <ResultCategoryCard
            key={index}
            category={RESULT_CATEGORY[category.category]}
            totalCredit={category.totalCredit}
            takenCredit={category.takenCredit}
          />
        ))}
      </div>
      {category && <ResultCategoryDetail category={category} />}
    </div>
  );
}

export default ResultPage;
