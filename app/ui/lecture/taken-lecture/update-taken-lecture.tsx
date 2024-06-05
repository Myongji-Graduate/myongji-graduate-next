'use client';
import { TakenLectrueInfo } from '@/app/store/stores/custom-taken-lecture';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { updateDialogAtom } from '@/app/store/stores/dialog';
import { useTakenLecture } from '@/app/business/hooks/use-taken-lecture.hook';

export default function UpdateTakenLecture({ data, children }: React.PropsWithChildren<{ data: TakenLectrueInfo[] }>) {
  const isLectureSearchOpen = useAtomValue(updateDialogAtom);
  const { initializeTakenLectures } = useTakenLecture();

  useEffect(() => {
    initializeTakenLectures(data);
  }, [isLectureSearchOpen, data]);

  return children;
}
