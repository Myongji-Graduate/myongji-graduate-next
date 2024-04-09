import { SearchedLectureInfo } from '@/app/type/lecture';
import Button from '../../view/atom/button/button';

interface AddTakenLectureButtonProps {
  lectureItem: SearchedLectureInfo;
}
export default function AddTakenLectureButton({ lectureItem }: AddTakenLectureButtonProps) {
  return <Button variant="list" label="추가" onClick={() => {}} />;
}
