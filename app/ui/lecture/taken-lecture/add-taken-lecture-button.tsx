import { useLectureStore } from '@/app/stores/lecture.store';
import Button from '../../view/atom/button/button';
import { SearchedLectureInfo } from '@/app/type/lecture';

interface AddTakenLectureButtonProps {
  lectureItem: SearchedLectureInfo;
}

export default function AddTakenLecutreButton({ lectureItem }: AddTakenLectureButtonProps) {
  const addTakenLecutre = useLectureStore((state) => state.actions.addTakenLecutre);

  const handleButtonClick = () => {
    addTakenLecutre({
      id: lectureItem.id,
      year: 'CUSTOM',
      semester: 'CUSTOM',
      lectureCode: lectureItem.lectureCode,
      lectureName: lectureItem.name,
      credit: lectureItem.credit,
    });
  };

  return <Button label="삭제" variant="list" data-testid="taken-lecture-delete-button" onClick={handleButtonClick} />;
}
