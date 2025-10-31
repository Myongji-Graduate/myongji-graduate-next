import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import { Metadata } from 'next';
import CreateTimetable from './components/create-timetable/create-timetable';
import Drawer from '@/app/ui/view/molecule/drawer/drawer';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import TimetableLectureSearch from './components/create-timetable/lecture/timetable-lecture-search';
import RecommendLectureModal from './components/recommend-lecture/recommend-lecture-modal';

export const metadata: Metadata = {
  title: '시간표',
  description: '시간표를 생성하거나 추천받아 보세요.',
};

function TimetablePage() {
  return (
    <>
      <ContentContainer className="flex flex-col gap-2 py-10 px-7 md:gap-6">
        <CreateTimetable />
      </ContentContainer>
      <Drawer drawerKey={DIALOG_KEY.TIMETABLE_LECTURE_SEARCH}>
        <TimetableLectureSearch />
      </Drawer>
      <RecommendLectureModal />
    </>
  );
}

export default TimetablePage;
