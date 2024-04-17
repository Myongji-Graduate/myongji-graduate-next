'use client';
import { takenLectureAtom } from '@/app/store/custom-taken-lecture';
import { TakenLectrueInfo } from '@/app/type/lecture';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect } from 'react';
import { updateDialogAtom } from './dialog';
import { useAtomValue, useSetAtom } from 'jotai';

export default function TakenLectureAtomHydrator({
  initialValue,
  children,
}: React.PropsWithChildren<{ initialValue: TakenLectrueInfo[] }>) {
  const isLectureSearchOpen = useAtomValue(updateDialogAtom);
  const setTakenLectures = useSetAtom(takenLectureAtom);

  useEffect(() => {
    setTakenLectures(initialValue);
  }, [isLectureSearchOpen]);

  useHydrateAtoms(new Map([[takenLectureAtom, initialValue]]));
  return children;
}
