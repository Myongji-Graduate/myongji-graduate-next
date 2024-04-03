/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { swipeTakenLectureAtom, takenLectureAtom } from '@/app/store/custom-taken-lecture';
import { LectureInfo } from '@/app/type/lecture';
import { useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect } from 'react';

export default function TakenLectureAtomHydrator({
  initialValue,
  children,
}: React.PropsWithChildren<{ initialValue: LectureInfo[] }>) {
  const setTakenLectureState = useSetAtom(takenLectureAtom);
  const setSwipeTakenLectureState = useSetAtom(swipeTakenLectureAtom);

  useEffect(() => {
    setTakenLectureState(initialValue);
    setSwipeTakenLectureState(initialValue);
  }, [initialValue]);

  useHydrateAtoms(new Map([[takenLectureAtom, initialValue]]));
  useHydrateAtoms(new Map([[swipeTakenLectureAtom, initialValue]]));
  return children;
}
