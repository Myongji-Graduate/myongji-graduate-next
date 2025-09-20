'use client';

import { SelectItem } from '@/app/ui/view/molecule/select/select-item';
import { SelectRoot } from '@/app/ui/view/molecule/select/select-root';

import Responsive from '@/app/ui/responsive';
import { SIMPLE_LECTURE_CATEGORY_KO } from '@/app/utils/key/common.key';
import { MAX_WIDTH, MIN_WIDTH } from '@/app/ui/timetable/create-timetable/create-timetable-constants';
import SearchInput from '@/app/ui/timetable/create-timetable/lecture/search-input';

function TimetableLectureFilters() {
  const CampusSelect = (
    <div className="w-[90px]">
      <SelectRoot placeholder="캠퍼스">
        <SelectItem placeholder="인문" value="인문" />
        <SelectItem placeholder="자연" value="자연" />
      </SelectRoot>
    </div>
  );

  const CompletionSelect = (
    <div className="w-[110px]">
      <SelectRoot placeholder="이수 여부">
        <SelectItem placeholder="미이수" value="미이수" />
        <SelectItem placeholder="이수" value="이수" />
        <SelectItem placeholder="전체" value="전체" />
      </SelectRoot>
    </div>
  );

  const CategorySelect = (
    <div className="w-[145px] min-w-[145px]">
      <SelectRoot placeholder="이수구분">
        <SelectItem placeholder="전체" value="all" />
        {Object.entries(SIMPLE_LECTURE_CATEGORY_KO).map(([key, label]) => (
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
          {<SearchInput />}
        </div>
      </Responsive>

      {/* 395px 이하 */}
      <Responsive maxWidth={MAX_WIDTH}>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">{Filters}</div>
          {<SearchInput />}
        </div>
      </Responsive>
    </div>
  );
}

export default TimetableLectureFilters;
