'use client';
import { takenLectureAtom } from '@/app/store/custom-taken-lecture';
import { LectureInfo } from '@/app/type/lecture';
import { useHydrateAtoms } from 'jotai/utils';

export default function TakenLectureAtomHydrator({
  initialValue,
  children,
}: React.PropsWithChildren<{ initialValue: LectureInfo[] }>) {
  useHydrateAtoms(new Map([[takenLectureAtom, initialValue]]));
  return children;
}
