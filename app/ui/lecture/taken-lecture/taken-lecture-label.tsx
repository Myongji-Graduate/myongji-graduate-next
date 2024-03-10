import Link from 'next/link';
import Button from '../../view/atom/button/button';
import LabelContainer from '../../view/atom/label-container/label-container';
import { useLectureStore } from '@/app/stores/lecture.store';

interface TakenLectureLabelProps {}

export default function TakenLectureLabel() {
  const isCustomizing = useLectureStore((state) => state.isCustomizing);
  const changeCustomizingState = useLectureStore((state) => state.actions.changeCustomizingState);

  const handleCustomizingStateChange = () => {
    changeCustomizingState();
  };

  return (
    <LabelContainer
      label="내 기이수 과목"
      rightElement={
        <div className="flex gap-2">
          {isCustomizing ? (
            <>
              <Button label="저장하기" variant="primary" size="md" />
              <Button label="취소하기" variant="secondary" size="md" onClick={changeCustomizingState} />
            </>
          ) : (
            <>
              <Button
                label="커스텀하기"
                variant="secondary"
                size="md"
                onClick={handleCustomizingStateChange}
                data-testid="custom-button"
              />
              <Link href="/file-upload">
                <Button label="업데이트" variant="secondary" size="md" />
              </Link>
            </>
          )}
        </div>
      }
    />
  );
}
