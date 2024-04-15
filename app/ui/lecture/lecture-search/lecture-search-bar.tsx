import Select from '../../view/molecule/select';
import TextInput from '../../view/atom/text-input/text-input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function LectureSearchBar() {
  return (
    <div className="flex justify-between mt-4 sm:mt-0">
      <div className="sm:w-[15%] w-[30%]">
        <Select defaultValue="lectureName" placeholder="과목명">
          <Select.Item value="lectureName" placeholder="과목명" />
          <Select.Item value="lectureCode" placeholder="과목코드" />
        </Select>
      </div>
      <div className="w-[60%] sm:w-[40%] flex justify-between">
        <TextInput placeholder="검색어를 입력해주세요" icon={MagnifyingGlassIcon} />
      </div>
    </div>
  );
}
