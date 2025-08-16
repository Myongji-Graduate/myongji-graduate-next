/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from 'next/link';
import Button from '../../view/atom/button/button';
import LabelContainer from '../../view/atom/label-container/label-container';
import useDialog from '@/app/hooks/useDialog';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';

export default function TakenLectureLabel() {
  const { isOpen, open } = useDialog(DIALOG_KEY.LECTURE_SEARCH);

  return (
    <LabelContainer
      label="내 기이수 과목"
      rightElement={
        <div className="flex gap-2">
          <Button
            tabIndex={isOpen ? -1 : 0}
            data-cy="open-lecture-search-dialog-button"
            label="과목 추가"
            variant="secondary"
            size="xs"
            data-testid="toggle-lecture-search"
            onClick={open}
          />
          <Link tabIndex={isOpen ? -1 : 0} href="/grade-upload">
            <Button tabIndex={isOpen ? -1 : 0} label="성적표 재업로드" variant="secondary" size="xs" />
          </Link>
        </div>
      }
    />
  );
}
