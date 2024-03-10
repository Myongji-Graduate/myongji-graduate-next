import { useLectureStore } from '@/app/stores/lecture.store';
import Button from '../../view/atom/button/button';

interface DeleteTakenLectureButtonProps {
  lectureId: number;
}

export default function DeleteTakenLecutreButton({ lectureId }: DeleteTakenLectureButtonProps) {
  const deleteLecture = useLectureStore((state) => state.actions.deleteLecture);

  const handleDeleteButtonClick = (id: number) => {
    deleteLecture(id);
  };

  return (
    <Button
      label="삭제"
      variant="list"
      data-testid="taken-lecture-delete-button"
      onClick={() => {
        handleDeleteButtonClick(lectureId);
      }}
    />
  );
}
