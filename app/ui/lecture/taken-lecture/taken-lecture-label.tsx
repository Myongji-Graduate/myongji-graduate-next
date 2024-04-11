/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from 'next/link';
import Button from '../../view/atom/button/button';
import LabelContainer from '../../view/atom/label-container/label-container';
import { useAtom, useSetAtom } from 'jotai';
import { isAddedLectureAtom } from '@/app/store/custom-taken-lecture';
import { useEffect } from 'react';

export default function TakenLectureLabel() {
  const setIsAddedLecture = useSetAtom(isAddedLectureAtom);

  useEffect(() => {
    return () => {
      setIsAddedLecture(false);
    };
  }, []);

  return (
    <LabelContainer
      label="내 기이수 과목"
      rightElement={
        <div className="flex gap-2">
          <Button
            label="과목 추가"
            variant="secondary"
            size="xs"
            data-testid="lecture-add-button"
            onClick={() => {
              setIsAddedLecture(true);
            }}
          />
          <Link href="/file-upload">
            <Button label="성적표 재업로드" variant="secondary" size="xs" />
          </Link>
        </div>
      }
    />
  );
}
