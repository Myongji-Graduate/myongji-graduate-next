/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Select from '../../view/molecule/select';
import TextInput from '../../view/atom/text-input/text-input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { searchWordAtom } from '@/app/store/search-word';

export default function LectureSearchBar() {
  const [searchWord, setSearchWord] = useAtom(searchWordAtom);
  let timeId: NodeJS.Timeout;

  useEffect(() => {
    return () => {
      setSearchWord({ keyword: null, type: 'lectureName' });
    };
  }, []);

  const handleTypeSeaerch = (value: unknown) => {
    if (typeof value === 'string') {
      setSearchWord({ ...searchWord, type: value });
    }
  };

  const handleDebounceKeywordSearch = (value: string) => {
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(() => {
      setSearchWord({ ...searchWord, keyword: value });
    }, 300);
  };

  return (
    <div className="flex justify-between mt-4 sm:mt-0">
      <div className="sm:w-[15%] w-[30%]">
        <Select defaultValue="lectureName" placeholder="과목명" onValueChange={handleTypeSeaerch}>
          <Select.Item value="lectureName" placeholder="과목명" />
          <Select.Item value="lectureCode" placeholder="과목코드" />
        </Select>
      </div>
      <div className="w-[60%] sm:w-[40%] flex justify-between flex-col gap-1">
        <TextInput
          data-cy="search-lecture-input"
          placeholder="검색어를 입력해주세요"
          icon={MagnifyingGlassIcon}
          onValueChange={handleDebounceKeywordSearch}
          data-testid="lecture-search-input"
        />
        <div className="text-zinc-400 text-xs text-end">※ 회색으로 표기된 과목은 폐강과목입니다</div>
      </div>
    </div>
  );
}
