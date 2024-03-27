'use client';
import Link from 'next/link';
import Button from '../../view/atom/button/button';
import LabelContainer from '../../view/atom/label-container/label-container';
import { useAtom, useSetAtom } from 'jotai';
import { customLectureAtom, isCustomizingAtom } from '@/app/store/custom-taken-lecture';
import { LectureInfo } from '@/app/type/lecture';

interface TakenLectureLabelProps {
  data: LectureInfo[];
}
export default function TakenLectureLabel({ data }: TakenLectureLabelProps) {
  const [isCustomizing, setIsCustomizing] = useAtom(isCustomizingAtom);
  const setCustomLecture = useSetAtom(customLectureAtom);

  const startCustomizing = () => {
    setIsCustomizing(true);
  };

  const cancelCustomizing = () => {
    setIsCustomizing(false);
    setCustomLecture(data);
  };

  return (
    <LabelContainer
      label="내 기이수 과목"
      rightElement={
        <div className="flex gap-2">
          {isCustomizing ? (
            <>
              <Button label="저장하기" variant="primary" size="xs" />
              <Button label="취소하기" variant="secondary" size="xs" onClick={cancelCustomizing} />
            </>
          ) : (
            <>
              <Button
                label="커스텀하기"
                variant="secondary"
                size="xs"
                onClick={startCustomizing}
                data-testid="custom-button"
              />
              <Link href="/file-upload">
                <Button label="업데이트" variant="secondary" size="xs" />
              </Link>
            </>
          )}
        </div>
      }
    />
  );
}
