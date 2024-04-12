import LectureSearch from '@/app/ui/lecture/lecture-search';
import TakenLecture from '@/app/ui/lecture/taken-lecture';
import ContentContainer from '@/app/ui/view/atom/content-container';
import SheetContainer from './components/sheet-container';
import TakenLectureLabel from '@/app/ui/lecture/taken-lecture/taken-lecture-label';
import { Provider } from 'jotai';

export default function MyPage() {
  return (
    <>
      <SheetContainer>
        <ContentContainer className="flex">
          <div className="hidden lg:w-[30%] lg:block">정보칸</div>
          <div className="w-full lg:w-[70%] lg:px-[20px]">
            <TakenLecture />
          </div>
        </ContentContainer>
      </SheetContainer>
    </>
  );
}
