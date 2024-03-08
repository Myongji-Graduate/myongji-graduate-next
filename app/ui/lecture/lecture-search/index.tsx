import { SearchedLectureInfo } from '@/app/type/lecture';
import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer from './lecture-search-result-container';

interface LectureSearchProps {
  handleAddButtonClick: (item: SearchedLectureInfo) => void;
}
export default function LectureSearch({ handleAddButtonClick }: LectureSearchProps) {
  return (
    <div className="flex flex-col gap-4" data-testid="lecture-search-component">
      <LectureSearchBar />
      <LectureSearchResultContainer handleAddButtonClick={handleAddButtonClick} />
    </div>
  );
}
