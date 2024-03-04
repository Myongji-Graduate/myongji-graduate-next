import Link from 'next/link';
import Button from '../../view/atom/button/button';
import LabelContainer from '../../view/atom/label-container/label-container';

interface TakenLectureLabelProps {
  isCustomizing: boolean;
  changeCustomizingState: VoidFunction;
}

export default function TakenLectureLabel({ isCustomizing, changeCustomizingState }: TakenLectureLabelProps) {
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
                onClick={changeCustomizingState}
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
