'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { SelectItem } from '@/app/ui/view/molecule/select/select-item';
import { SelectRoot } from '@/app/ui/view/molecule/select/select-root';
import Button from '@/app/ui/view/atom/button/button';
import Responsive from '@/app/ui/responsive';
import { FILTERS_MAX_WIDTH, FILTERS_MIN_WIDTH } from '@/app/ui/timetable/create-timetable/create-timetable-constants';
import RadioGroup from '@/app/ui/view/molecule/radio-group/radio-group';

import { PRIMARY_LECTURE_CATEGORY_KO } from '@/app/utils/key/common.key';
import { major as MAJORS } from '@/app/utils/majors/major';

type SortKey = 'popular' | 'mostTaken' | null;
type CategoryKey = keyof typeof PRIMARY_LECTURE_CATEGORY_KO | 'all';
type Year = '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24';

const YEARS: Year[] = ['16', '17', '18', '19', '20', '21', '22', '23', '24'];

function LectureFilters() {
  const [major, setMajor] = useState<string>('전공명');
  const [year, setYear] = useState<Year | ''>('');
  const [category, setCategory] = useState<CategoryKey>('all');
  const [sort, setSort] = useState<SortKey>(null);

  const categoryEntries = useMemo(() => Object.entries(PRIMARY_LECTURE_CATEGORY_KO) as [CategoryKey, string][], []);

  const sortOptions = useMemo(
    () => [
      { label: '인기순', value: 'popular' },
      { label: '많이 들은 순', value: 'mostTaken' },
    ],
    [],
  );

  const handleSearch = useCallback(() => {}, [major, year, category, sort]);

  const handleSortChange = useCallback((v: string) => {
    setSort(v as SortKey);
  }, []);

  const MajorSelect = (
    <div className="w-1/2">
      <SelectRoot
        key={`major-${major}`}
        placeholder="전공명"
        defaultValue={major}
        onValueChange={(v) => setMajor(v as string)}
        required
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
        placeholder="학번"
        defaultValue={year}
        onValueChange={(v) => setYear(v as Year)}
        required
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
        placeholder="전체"
        defaultValue={category}
        onValueChange={(v) => setCategory(v as CategoryKey)}
      >
        <SelectItem value="all" placeholder="전체" />
        {categoryEntries.map(([key, label]) => (
          <SelectItem key={key} value={key} placeholder={label} />
        ))}
      </SelectRoot>
    </div>
  );

  const SortRadios = (
    <RadioGroup
      name="lecture-sort"
      options={sortOptions}
      value={sort ?? ''}
      onChange={handleSortChange}
      className="flex gap-3"
    />
  );

  const SearchButton = <Button label="검색" size="sm" variant="primary" onClick={handleSearch} />;

  const Filters = (
    <>
      {MajorSelect}
      {YearSelect}
      {CategorySelect}
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      <Responsive minWidth={FILTERS_MIN_WIDTH}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">{Filters}</div>
          <div className="flex items-center justify-between px-1 gap-3">
            {SortRadios}
            {SearchButton}
          </div>
        </div>
      </Responsive>

      <Responsive maxWidth={FILTERS_MAX_WIDTH}>
        <div className="flex flex-col gap-5">
          <div className="flex items-center w-full gap-2">{Filters}</div>
          <div className="flex items-center justify-between gap-3">
            {SortRadios}
            {SearchButton}
          </div>
        </div>
      </Responsive>
    </div>
  );
}

export default LectureFilters;
