import { SearchedLectureInfo } from '@/app/type/lecture';
import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer from './lecture-search-result-container';

interface LectureSearchProps {}
export default function LectureSearch() {
  return (
    <div className="flex flex-col gap-4" data-testid="lecture-search-component">
      <LectureSearchBar />
      <LectureSearchResultContainer />
    </div>
  );
}
