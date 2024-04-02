'use client';
import Link from 'next/link';
import Button from '../../view/atom/button/button';
import LabelContainer from '../../view/atom/label-container/label-container';

export default function TakenLectureLabel() {
  return (
    <LabelContainer
      label="내 기이수 과목"
      rightElement={
        <div className="flex gap-2">
          <Button label="과목 추가" variant="secondary" size="xs" data-testid="lecture-add-button" />
          <Link href="/file-upload">
            <Button label="성적표 재업로드" variant="secondary" size="xs" />
          </Link>
        </div>
      }
    />
  );
}
