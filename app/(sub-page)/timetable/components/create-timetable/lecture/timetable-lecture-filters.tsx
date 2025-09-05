'use client';

import TextInput from '@/app/ui/view/atom/text-input/text-input';
import { SelectItem } from '@/app/ui/view/molecule/select/select-item';
import { SelectRoot } from '@/app/ui/view/molecule/select/select-root';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

function TimetableLectureFilters() {
  return (
    <div className="flex gap-3 items-center">
      <div className="w-[100px]">
        <SelectRoot placeholder="캠퍼스">
          <SelectItem placeholder="인문" value="인문" />
          <SelectItem placeholder="자연" value="자연" />
        </SelectRoot>
      </div>
      <div className="w-[120px]">
        <SelectRoot placeholder="이수 여부">
          <SelectItem placeholder="미이수" value="미이수" />
          <SelectItem placeholder="이수" value="이수" />
          <SelectItem placeholder="전체" value="전체" />
        </SelectRoot>
      </div>
      <div>
        <TextInput
          placeholder="과목명·교수명으로 검색"
          icon={MagnifyingGlassIcon}
          className="h-[42px] rounded-xl w-[270px]"
        />
      </div>
    </div>
  );
}

export default TimetableLectureFilters;
