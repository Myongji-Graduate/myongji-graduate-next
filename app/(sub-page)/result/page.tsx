import UserInfoCard from '@/app/ui/user/user-info-card/user-info-card';
import ContentContainer from '@/app/ui/view/atom/content-container';
import CategoryCard from '@/app/ui/view/molecule/category-card/category-card';
import { cn } from '@/app/utils/shadcn/utils';

function ResultPage() {
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
          <CategoryCard key={index} />
        ))}
      </div>
    </div>
  );
}

export default ResultPage;
