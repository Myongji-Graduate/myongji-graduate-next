'use client';

import TextInput from '@/app/ui/view/atom/text-input/text-input';
import { SelectItem } from '@/app/ui/view/molecule/select/select-item';
import { SelectRoot } from '@/app/ui/view/molecule/select/select-root';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Responsive from '@/app/ui/responsive';
import { MIN_WIDTH, MAX_WIDTH } from '@/app/ui/timetable/create-timetable-constants';
import { RESULT_CATEGORY_KO } from '@/app/utils/key/result-category.key';

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

  const categories = [
    RESULT_CATEGORY_KO.COMMON_CULTURE,
    RESULT_CATEGORY_KO.CORE_CULTURE,
    RESULT_CATEGORY_KO.PRIMARY_MANDATORY_MAJOR,
    RESULT_CATEGORY_KO.PRIMARY_ELECTIVE_MAJOR,
    RESULT_CATEGORY_KO.PRIMARY_BASIC_ACADEMICAL_CULTURE,
    RESULT_CATEGORY_KO.NORMAL_CULTURE,
    RESULT_CATEGORY_KO.FREE_ELECTIVE,
    RESULT_CATEGORY_KO.CHAPEL,
    RESULT_CATEGORY_KO.TRANSFER_CHRISTIAN,
  ];

  const CategorySelect = (
    <div className="w-[120px] min-w-[120px]">
      <SelectRoot placeholder="이수구분">
        <SelectItem placeholder="전체" value="all" />
        {categories.map((category, index) => (
          <SelectItem key={index} placeholder={category} value={category} />
        ))}
      </SelectRoot>
    </div>
  );

  const SearchInput = (
    <TextInput placeholder="과목명·교수명 검색" icon={MagnifyingGlassIcon} className="h-[42px] rounded-xl w-[270px]" />
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
          {SearchInput}
        </div>
      </Responsive>

      {/* 395px 이하 */}
      <Responsive maxWidth={MAX_WIDTH}>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">{Filters}</div>
          {SearchInput}
        </div>
      </Responsive>
    </div>
  );
}

export default TimetableLectureFilters;
