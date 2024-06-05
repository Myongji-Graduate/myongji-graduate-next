'use client';
import { takenLectureAtom } from '@/app/store/stores/custom-taken-lecture';
import { TakenLectrueInfo } from './custom-taken-lecture';
import { useHydrateAtoms } from 'jotai/utils';

export default function TakenLectureAtomHydrator({
  initialValue,
  children,
}: React.PropsWithChildren<{ initialValue: TakenLectrueInfo[] }>) {
  useHydrateAtoms(new Map([[takenLectureAtom, initialValue]]));
  return children;
}
