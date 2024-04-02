'use client';
import { takenLectureAtom } from '@/app/store/custom-taken-lecture';
import { LectureInfo } from '@/app/type/lecture';
import { useHydrateAtoms } from 'jotai/utils';
import { type ReactNode } from 'react';

export default function AtomsHydrator({
  initialValue,
  children,
}: {
  initialValue: LectureInfo[];
  children: ReactNode;
}) {
  useHydrateAtoms(new Map([[takenLectureAtom, initialValue]]));
  return children;
}
