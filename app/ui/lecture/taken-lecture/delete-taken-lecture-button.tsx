import { useAtom } from 'jotai';
import Button from '../../view/atom/button/button';
import { customLectureAtom } from '@/app/store/custom-taken-lecture';

interface DeleteTakenLectureButtonProps {
  lectureId: number;
}
export default function DeleteTakenLectureButton({ lectureId }: DeleteTakenLectureButtonProps) {
  const [customLecture, setCustomLecture] = useAtom(customLectureAtom);
  const deleteLecture = () => {
    setCustomLecture(customLecture.filter((lecture) => lecture.id !== lectureId));
  };
  return <Button label="삭제" variant="list" data-testid="taken-lecture-delete-button" onClick={deleteLecture} />;
}
