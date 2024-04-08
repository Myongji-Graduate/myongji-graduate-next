'use client';
import Button from '../../view/atom/button/button';

interface DeleteTakenLectureButtonProps {
  lectureId: number;
  handleDelete: (lectureId: number) => void;
}
export default function DeleteTakenLectureButton({ lectureId, handleDelete }: DeleteTakenLectureButtonProps) {
  return (
    <form
      action={() => {
        handleDelete(lectureId);
      }}
    >
      <div className="opacity-0 group-hover:opacity-100">
        <Button label="삭제" variant="text" size="default" type="submit" />
      </div>
    </form>
  );
}
