'use client';

import { SelectItem } from '@/app/ui/view/molecule/select/select-item';
import { SelectRoot } from '@/app/ui/view/molecule/select/select-root';

import Responsive from '@/app/ui/responsive';
import { MAX_WIDTH, MIN_WIDTH } from '@/app/ui/timetable/create-timetable/create-timetable-constants';
import SearchInput from '@/app/ui/timetable/create-timetable/lecture/search-input';
import { useTimetableLectureFilter } from '@/app/business/hooks/use-timetable-lecture-filter.hook';

function TimetableLectureFilters() {
  const { filters, setCampus, setFilterType, setRecommendedCategory, currentCategory } = useTimetableLectureFilter();

  const CampusSelect = (
    <div className="w-[90px]">
      <SelectRoot
        placeholder="인문"
        key={`campus-${filters.campus}`}
        defaultValue={filters.campus}
        onValueChange={(v) => setCampus(v as string)}
      >
        <SelectItem placeholder="인문" value="인문" />
        <SelectItem placeholder="자연" value="자연" />
      </SelectRoot>
    </div>
  );

  const CompletionSelect = (
    <div className="w-[110px]">
      <SelectRoot
        key={`filter-${filters.filter}`}
        placeholder="미이수"
        defaultValue={filters.filter}
        onValueChange={(v) => setFilterType(v as 'TAKEN' | 'NOT_TAKEN' | 'ALL')}
      >
        <SelectItem placeholder="미이수" value="NOT_TAKEN" />
        <SelectItem placeholder="이수" value="TAKEN" />
        <SelectItem placeholder="전체" value="ALL" />
      </SelectRoot>
    </div>
  );

  const CategorySelect = (
    <div className="w-[145px] min-w-[145px]">
      <SelectRoot
        key={`categorySelect-${filters.recommendedCategory}`}
        placeholder="전체"
        defaultValue={filters.recommendedCategory || 'all'}
        onValueChange={(v) => setRecommendedCategory(v === 'all' ? '' : (v as string))}
      >
        <SelectItem placeholder="전체" value="all" />
        {Object.entries(currentCategory).map(([key, label]) => (
          <SelectItem key={key} placeholder={label} value={key} />
        ))}
      </SelectRoot>
    </div>
  );

  const Filters = (
    <>
      {CampusSelect}
      {CompletionSelect}
      {CategorySelect}
    </>
  );

  return (
    <div className="flex flex-col gap-3">
      {/* 395px 이상 */}
      <Responsive minWidth={MIN_WIDTH}>
        <div className="flex gap-3 items-center">
          {Filters}
          <SearchInput />
        </div>
      </Responsive>

      {/* 395px 이하 */}
      <Responsive maxWidth={MAX_WIDTH}>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">{Filters}</div>
          <SearchInput />
        </div>
      </Responsive>
    </div>
  );
}

export default TimetableLectureFilters;
