'use client';

import React, { useMemo } from 'react';
import { SelectItem } from '@/app/ui/view/molecule/select/select-item';
import { SelectRoot } from '@/app/ui/view/molecule/select/select-root';
import Button from '@/app/ui/view/atom/button/button';
import { LECTURE_FINDER_CATEGORY_KO, YEARS } from '../type';
import { major as MAJORS } from '@/app/utils/majors/major';
import type { CategoryKey } from '../type';
import { Info } from 'lucide-react';
import { PendingFilters } from '../type';

type Props = {
  filters: PendingFilters;
  onMajorChange: (v: unknown) => void;
  onYearChange: (v: unknown) => void;
  onCategoryChange: (v: unknown) => void;
  onSearch: () => void;
};

const PLACEHOLDER = {
  major: '전공명',
  year: '학번',
  categoryAll: '전체',
} as const;

function LectureFilterGroup({ filters, onMajorChange, onYearChange, onCategoryChange, onSearch }: Props) {
  const { major, year, category } = filters;

  const categoryEntries = useMemo(() => Object.entries(LECTURE_FINDER_CATEGORY_KO) as [CategoryKey, string][], []);

  const MajorSelect = (
    <div className="w-1/2">
      <SelectRoot
        key={`major-${major || 'none'}`}
        placeholder={PLACEHOLDER.major}
        defaultValue={major}
        onValueChange={onMajorChange}
      >
        {MAJORS.map((m) => (
          <SelectItem key={m} value={m} placeholder={m} />
        ))}
      </SelectRoot>
    </div>
  );

  const YearSelect = (
    <div className="w-1/3">
      <SelectRoot
        key={`year-${year || 'none'}`}
        placeholder={PLACEHOLDER.year}
        defaultValue={year}
        onValueChange={onYearChange}
      >
        {YEARS.map((y) => (
          <SelectItem key={y} value={y} placeholder={y} />
        ))}
      </SelectRoot>
    </div>
  );

  const CategorySelect = (
    <div className="w-1/3">
      <SelectRoot
        key={`category-${category}`}
        placeholder={PLACEHOLDER.categoryAll}
        defaultValue={category}
        onValueChange={onCategoryChange}
      >
        <SelectItem value="ALL" placeholder={PLACEHOLDER.categoryAll} />
        {categoryEntries.map(([key, label]) => (
          <SelectItem key={key} value={key} placeholder={label} />
        ))}
      </SelectRoot>
    </div>
  );

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-row gap-3 w-full">
        {MajorSelect}
        {YearSelect}
        {CategorySelect}
      </div>

      <div className="flex justify-end w-full">
        <Button label="검색" size="sm" variant="primary" onClick={onSearch} />
      </div>

      <div className="flex items-start gap-2 px-3 ">
        <Info className="w-4 h-4 text-gray-500 mt-0.5" />
        <p className="text-sm text-gray-700">
          과목 테이블을 눌러 <span className="font-medium">교수님 별 강의 정보</span>를 확인해보세요
        </p>
      </div>
    </div>
  );
}

export default LectureFilterGroup;
