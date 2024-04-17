import { LectureInfo } from '@/app/type/lecture';
import Button from '../../view/atom/button/button';

interface AddTakenLectureButtonProps {
  lectureItem: LectureInfo;
  isTakenLecture: boolean;
}
export default function AddTakenLectureButton({ lectureItem, isTakenLecture }: AddTakenLectureButtonProps) {
  return <Button variant="list" label="추가" disabled={isTakenLecture} onClick={() => {}} />;
}
