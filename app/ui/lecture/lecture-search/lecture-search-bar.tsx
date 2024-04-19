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

  useEffect(() => {
    params.set('type', 'lectureName');
    replace(`${pathname}?${params.toString()}`);

    return () => {
      params.delete('type');
      params.delete('keyword');
      replace(`${pathname}?${params.toString()}`);
    };
  }, []);

  const handleTypeSeaerch = (value: unknown) => {
    if (typeof value === 'string') {
      params.set('type', value);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleKeywordSearch = (value: string) => {
    params.set('keyword', value);
    replace(`${pathname}?${params.toString()}`);
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
        <TextInput placeholder="검색어를 입력해주세요" icon={MagnifyingGlassIcon} onValueChange={handleKeywordSearch} />
      </div>
    </div>
  );
}
