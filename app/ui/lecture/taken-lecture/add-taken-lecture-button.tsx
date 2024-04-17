import { LectureInfo } from '@/app/type/lecture';
import Button from '../../view/atom/button/button';

interface AddTakenLectureButtonProps {
  lectureItem: LectureInfo;
}
export default function AddTakenLectureButton({ lectureItem }: AddTakenLectureButtonProps) {
  return <Button variant="list" label="추가" onClick={() => {}} />;
}
