'use client';

import React, { useMemo } from 'react';
import { SelectItem } from '@/app/ui/view/molecule/select/select-item';
import { SelectRoot } from '@/app/ui/view/molecule/select/select-root';
import Button from '@/app/ui/view/atom/button/button';
import Responsive from '@/app/ui/responsive';
import { FILTERS_MAX_WIDTH, FILTERS_MIN_WIDTH } from '@/app/ui/timetable/create-timetable/create-timetable-constants';
import RadioGroup from '@/app/ui/view/molecule/radio-group/radio-group';
import { LECTURE_FINDER_CATEGORY_KO, YEARS } from '../type';
import { major as MAJORS } from '@/app/utils/majors/major';
import type { CategoryKey, PendingFilters } from '../type';

type Props = {
  value: PendingFilters;
  onMajorChange: (v: unknown) => void;
  onYearChange: (v: unknown) => void;
  onCategoryChange: (v: unknown) => void;
  onSortChange: (v: string) => void;
  onSearch: () => void;
};

const PLACEHOLDER = {
  major: '전공명',
  year: '학번',
  categoryAll: '전체',
} as const;

function LectureFilters({ value, onMajorChange, onYearChange, onCategoryChange, onSortChange, onSearch }: Props) {
  const { major, year, category, sort } = value;

  const categoryEntries = useMemo(() => Object.entries(LECTURE_FINDER_CATEGORY_KO) as [CategoryKey, string][], []);

  const sortOptions = [
    { label: '인기순', value: 'popular' },
    { label: '많이 들은 순', value: 'mostTaken' },
  ] as const;

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
        <SelectItem value="all" placeholder={PLACEHOLDER.categoryAll} />
        {categoryEntries.map(([key, label]) => (
          <SelectItem key={key} value={key} placeholder={label} />
        ))}
      </SelectRoot>
    </div>
  );

  const SortRadios = (
    <RadioGroup
      name="lecture-sort"
      options={sortOptions as any}
      value={sort ?? ''}
      onChange={onSortChange}
      className="flex gap-3"
    />
  );

  return (
    <div className="flex flex-col gap-3">
      <Responsive minWidth={FILTERS_MIN_WIDTH}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {MajorSelect}
            {YearSelect}
            {CategorySelect}
          </div>
          <div className="flex items-center justify-between gap-3 px-1">
            {SortRadios}
            <Button label="검색" size="sm" variant="primary" onClick={onSearch} />
          </div>
        </div>
      </Responsive>

      <Responsive maxWidth={FILTERS_MAX_WIDTH}>
        <div className="flex flex-col gap-5">
          <div className="flex w-full items-center gap-2">
            {MajorSelect}
            {YearSelect}
            {CategorySelect}
          </div>
          <div className="flex items-center justify-between gap-3">
            {SortRadios}
            <Button label="검색" size="sm" variant="primary" onClick={onSearch} />
          </div>
        </div>
      </Responsive>
    </div>
  );
}

export default LectureFilters;
