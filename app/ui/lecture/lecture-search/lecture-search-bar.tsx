import Select from '../../view/molecule/select';
import TextInput from '../../view/atom/text-input/text-input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function LectureSearchBar() {
  // 검색 기능을 해당 컴포넌트에서 구현 예정
  return (
    <div className="flex justify-between">
      <div className="w-[15%]">
        <Select defaultValue="lectureName" placeholder="과목명">
          <Select.Item value="lectureName" placeholder="과목명" />
          <Select.Item value="lectureCode" placeholder="과목코드" />
        </Select>
      </div>
      <div className="w-[40%] flex justify-between">
        <TextInput placeholder="검색어를 입력해주세요" icon={MagnifyingGlassIcon} />
      </div>
    </div>
  );
}
