'use client';
import Select from '../../view/molecule/select';
import TextInput from '../../view/atom/text-input/text-input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LectureSearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  let timeId: NodeJS.Timeout;

  const deleteParams = () => {
    params.delete('type');
    params.delete('keyword');
    replace(`${pathname}?${params.toString()}`);
  };

  const setParams = (name: string, value: string) => {
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setParams('type', 'lectureName');
    return deleteParams;
  }, []);

  const handleTypeSeaerch = (value: unknown) => {
    if (typeof value === 'string') {
      setParams('type', value);
    }
  };

  const handleDebounceKeywordSearch = (value: string) => {
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(() => {
      setParams('keyword', value);
    }, 500);
  };

  return (
    <div className="flex justify-between mt-4 sm:mt-0">
      <div className="sm:w-[15%] w-[30%]">
        <Select defaultValue="lectureName" placeholder="과목명" onValueChange={handleTypeSeaerch}>
          <Select.Item value="lectureName" placeholder="과목명" />
          <Select.Item value="lectureCode" placeholder="과목코드" />
        </Select>
      </div>
      <div className="w-[60%] sm:w-[40%] flex justify-between">
        <TextInput
          placeholder="검색어를 입력해주세요"
          icon={MagnifyingGlassIcon}
          onValueChange={handleDebounceKeywordSearch}
        />
      </div>
    </div>
  );
}
