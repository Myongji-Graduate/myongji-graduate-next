import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import { Metadata } from 'next';
import CreateTimetable from './components/create-timetable/create-timetable';
import Drawer from '@/app/ui/view/molecule/drawer/drawer';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import TimetableLectureSearch from './components/create-timetable/lecture/timetable-lecture-search';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchUser } from '@/app/business/services/user/user.query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import RecommendLectureModal from './components/recommend-lecture/recommend-lecture-modal';
import { fetchTimetable } from '@/app/business/services/timetable/timetable.command';
import { CURRENT_YEAR, CURRENT_SEMESTER } from '@/app/utils/timetable/constants';

export const metadata: Metadata = {
  title: '시간표',
  description: '시간표를 생성해 보세요.',
};

async function TimetablePage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: [QUERY_KEY.USER], queryFn: fetchUser }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.TIMETABLE],
      queryFn: () => fetchTimetable({ year: CURRENT_YEAR, semester: CURRENT_SEMESTER }),
    }),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ContentContainer className="flex flex-col gap-2 py-10 px-7 md:gap-6">
          <CreateTimetable />
        </ContentContainer>
        <Drawer drawerKey={DIALOG_KEY.TIMETABLE_LECTURE_SEARCH}>
          <TimetableLectureSearch />
        </Drawer>
      </HydrationBoundary>
      <RecommendLectureModal />
    </>
  );
}

export default TimetablePage;
