import { useLectureStore } from '@/app/stores/lecture.store';
import Button from '../../view/atom/button/button';
import { SearchedLectureInfo } from '@/app/type/lecture';

interface AddTakenLectureButtonProps {
  lectureItem: SearchedLectureInfo;
}

export default function AddTakenLecutreButton({ lectureItem }: AddTakenLectureButtonProps) {
  const addTakenLecutre = useLectureStore((state) => state.actions.addTakenLecutre);

  const handleButtonClick = () => {
    // 중복 제거 등의 로직이 여기 붙이면 된다.

    addTakenLecutre({
      id: lectureItem.id,
      year: 'CUSTOM',
      semester: 'CUSTOM',
      lectureCode: lectureItem.lectureCode,
      lectureName: lectureItem.name,
      credit: lectureItem.credit,
    });
  };

  // error: prettier 세미콜론 에러
  return <Button label="추가" variant="list" onClick={handleButtonClick} />;
}
