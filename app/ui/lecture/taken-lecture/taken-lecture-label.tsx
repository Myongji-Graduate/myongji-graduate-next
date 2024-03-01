import Link from 'next/link';
import Button from '../../view/atom/button/button';
import LabelContainer from '../../view/atom/label-container/label-container';
import { Dispatch, SetStateAction } from 'react';

type TakenLectureLabelProps = {
  isCustomizing: boolean;
  setIsCustomizing: Dispatch<SetStateAction<boolean>>;
};

export default function TakenLectureLabel({ isCustomizing, setIsCustomizing }: TakenLectureLabelProps) {
  const handleCustom = () => {
    setIsCustomizing(!isCustomizing);
  };
  return (
    <LabelContainer
      label="내 기이수 과목"
      rightElement={
        <div className="flex gap-2">
          {isCustomizing ? (
            <>
              <Button label="저장하기" variant="primary" size="md" />
              <Button label="취소하기" variant="secondary" size="md" onClick={handleCustom} />
            </>
          ) : (
            <>
              <Button
                label="커스텀하기"
                variant="secondary"
                size="md"
                onClick={handleCustom}
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
