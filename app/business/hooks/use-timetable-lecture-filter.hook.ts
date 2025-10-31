'use client';

import { useAtom } from 'jotai';
import { timetableLectureFilterAtom } from '@/app/store/stores/timetable-lecture';
import {
  PRIMARY_LECTURE_CATEGORY_KO,
  DUAL_LECTURE_CATEGORY_KO,
  SUB_LECTURE_CATEGORY_KO,
} from '@/app/utils/key/common.key';
import { useMemo } from 'react';
import { useFetchUser } from '../services/user/user.client.query';

export function useTimetableLectureFilter() {
  const [filters, setFilters] = useAtom(timetableLectureFilterAtom);

  const { data: userInfo } = useFetchUser();

  const categoryMap = {
    PRIMARY: PRIMARY_LECTURE_CATEGORY_KO,
    DUAL: DUAL_LECTURE_CATEGORY_KO,
    SUB: SUB_LECTURE_CATEGORY_KO,
  } as const;

  type MajorType = keyof typeof categoryMap;

  const majorType: MajorType = useMemo(() => {
    if (!userInfo) return 'PRIMARY';
    const { completeDivision } = userInfo;

    if (typeof completeDivision[0] === 'string') return 'PRIMARY';

    const types = completeDivision
      .filter((d): d is { majorType: 'PRIMARY' | 'DUAL' | 'SUB'; major: string } => typeof d !== 'string')
      .map((d) => d.majorType);
    if (types.includes('SUB')) return 'SUB';
    if (types.includes('DUAL')) return 'DUAL';
    return 'PRIMARY';
  }, [userInfo]);

  const currentCategory = categoryMap[majorType];

  const setCampus = (campus: string) => setFilters((prev) => ({ ...prev, campus }));
  const setFilterType = (filter: 'TAKEN' | 'NOT_TAKEN' | 'ALL') => setFilters((prev) => ({ ...prev, filter }));
  const setKeyword = (keyword: string) => setFilters((prev) => ({ ...prev, keyword }));
  const setProfessor = (professor: string) => setFilters((prev) => ({ ...prev, professor }));
  const setRecommendedCategory = (categoryKey: string) =>
    setFilters((prev) => ({ ...prev, recommendedCategory: categoryKey }));

  return {
    filters,
    userInfo,
    setFilters,
    setCampus,
    setFilterType,
    setKeyword,
    setProfessor,
    setRecommendedCategory,
    currentCategory,
  };
}
