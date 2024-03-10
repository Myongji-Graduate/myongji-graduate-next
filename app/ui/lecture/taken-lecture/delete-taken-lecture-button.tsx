import { useLectureStore } from '@/app/stores/lecture.store';
import Button from '../../view/atom/button/button';

interface DeleteTakenLectureButtonProps {
  lectureId: number;
}

export default function DeleteTakenLecutreButton({ lectureId }: DeleteTakenLectureButtonProps) {
  const deleteTakenLecture = useLectureStore((state) => state.actions.deleteTakenLecture);

  const handleDeleteButtonClick = () => {
    deleteTakenLecture(lectureId);
  };

  return (
    <Button label="삭제" variant="list" data-testid="taken-lecture-delete-button" onClick={handleDeleteButtonClick} />
  );
}
