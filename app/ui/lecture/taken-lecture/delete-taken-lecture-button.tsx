'use client';
import Button from '../../view/atom/button/button';

interface DeleteTakenLectureButtonProps {
  lectureId: number;
}
export default function DeleteTakenLectureButton({ lectureId }: DeleteTakenLectureButtonProps) {
  const deleteLecture = () => {
    // 삭제 api 연결 예정
  };
  return (
    <div className="opacity-0 group-hover:opacity-100">
      <Button
        label="삭제"
        variant="text"
        size="default"
        data-testid="taken-lecture-delete-button"
        onClick={deleteLecture}
      />
    </div>
  );
}
