import TextInput from '@/app/ui/view/atom/text-input/text-input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

function SearchInput() {
  return (
    <>
      <TextInput
        placeholder="과목명·교수명 검색"
        icon={MagnifyingGlassIcon}
        className="h-[42px] rounded-xl w-[270px]"
      />
    </>
  );
}

export default SearchInput;
