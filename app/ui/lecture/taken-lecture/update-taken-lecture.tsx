'use client';
import { takenLectureAtom } from '@/app/store/stores/custom-taken-lecture';
import { TakenLectrueInfo } from '@/app/type/lecture';
import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { updateDialogAtom } from '@/app/store/stores/dialog';

export default function UpdateTakenLecture({ data, children }: React.PropsWithChildren<{ data: TakenLectrueInfo[] }>) {
  const isLectureSearchOpen = useAtomValue(updateDialogAtom);
  const setTakenLectures = useSetAtom(takenLectureAtom);

  useEffect(() => {
    setTakenLectures(data);
  }, [isLectureSearchOpen, data]);

  return children;
}
