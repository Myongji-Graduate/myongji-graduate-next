'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import useDialog from '@/app/hooks/useDialog';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';

function SearchInput() {
  const { open: searchDialogOpen } = useDialog(DIALOG_KEY.LECTURE_NAME_OR_PROFESSOR_SEARCH);

  return (
    <button
      onClick={searchDialogOpen}
      className="h-[42px] rounded-xl w-[270px] flex items-center gap-2 text-gray-400 hover:bg-gray-100 text-base pl-3 border-gray-200 border-[1px]"
    >
      <MagnifyingGlassIcon />
      <p>과목명·교수명</p>
    </button>
  );
}

export default SearchInput;
