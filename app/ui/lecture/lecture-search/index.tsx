import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer, { SearchLectureInfo } from './lecture-search-result-container';

interface LectureSearchProps {
  handleAddButtonClick: (item: SearchLectureInfo) => void;
}
export default function LectureSearch({ handleAddButtonClick }: LectureSearchProps) {
  return (
    <div className="flex flex-col gap-4">
      <LectureSearchBar />
      <LectureSearchResultContainer handleAddButtonClick={handleAddButtonClick} />
    </div>
  );
}
