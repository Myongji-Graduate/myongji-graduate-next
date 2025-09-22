'use client';

import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { timetableLectureFilterAtom } from '@/app/store/stores/timetable-lecture';
import {
  PRIMARY_LECTURE_CATEGORY_KO,
  DUAL_LECTURE_CATEGORY_KO,
  SUB_LECTURE_CATEGORY_KO,
} from '@/app/utils/key/common.key';
import { fetchUser } from '../services/user/user.query';
import { InitUserInfoResponse, UserInfoResponse } from '../services/user/user.type';

export function useTimetableLectureFilter() {
  const [filters, setFilters] = useAtom(timetableLectureFilterAtom);

  const { data: userInfo } = useQuery<InitUserInfoResponse | UserInfoResponse>({
    queryKey: ['userInfo'],
    queryFn: fetchUser,
  });

  const categoryMap = {
    PRIMARY: PRIMARY_LECTURE_CATEGORY_KO,
    DUAL: DUAL_LECTURE_CATEGORY_KO,
    SUB: SUB_LECTURE_CATEGORY_KO,
  } as const;
  type MajorType = keyof typeof categoryMap;

  const majorType: MajorType = (userInfo as UserInfoResponse)?.completeDivision?.[0]?.majorType ?? 'PRIMARY';

  const currentCategory = categoryMap[majorType];

  const setCampus = (campus: string) => setFilters({ ...filters, campus });
  const setFilterType = (filter: 'TAKEN' | 'NOT_TAKEN' | 'ALL') => setFilters({ ...filters, filter });
  const setKeyword = (keyword: string) => setFilters({ ...filters, keyword });
  const setProfessor = (professor: string) => setFilters({ ...filters, professor });
  const setRecommendedCategory = (categoryKey: string) => setFilters({ ...filters, recommendedCategory: categoryKey });

  return {
    setFilters,
    setCampus,
    setFilterType,
    setKeyword,
    setProfessor,
    setRecommendedCategory,
    currentCategory,
  };
}
