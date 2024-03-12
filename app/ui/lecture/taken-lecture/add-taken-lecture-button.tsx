import { SearchedLectureInfo } from '@/app/type/lecture';
import Button from '../../view/atom/button/button';
import { useAtom } from 'jotai';
import { customLectureAtom } from '@/app/store/custom-taken-lecture';

interface AddTakenLectureButtonProps {
  lectureItem: SearchedLectureInfo;
}
export default function AddTakenLectureButton({ lectureItem }: AddTakenLectureButtonProps) {
  const [customLecture, setCustomLecture] = useAtom(customLectureAtom);
  const addLecture = () => {
    setCustomLecture([
      ...customLecture,
      {
        id: lectureItem.id,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: lectureItem.lectureCode,
        lectureName: lectureItem.name,
        credit: lectureItem.credit,
      },
    ]);
  };
  return <Button variant="list" label="추가" onClick={addLecture} />;
}
