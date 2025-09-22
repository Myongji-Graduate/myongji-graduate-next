'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import useDialog from '@/app/hooks/useDialog';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { useAtom } from 'jotai';
import { timetableLectureSearchWordAtom } from '@/app/store/stores/timetable-lecture';
import { useTimetableLectureFilter } from '@/app/business/hooks/use-timetable-lecture-filter.hook';
import Tag from '@/app/ui/view/atom/tag/tag';

function SearchInput() {
  const { open: searchDialogOpen } = useDialog(DIALOG_KEY.LECTURE_NAME_OR_PROF_SEARCH);
  const [searchWord, setSearchWord] = useAtom(timetableLectureSearchWordAtom);
  const { setKeyword, setProfessor } = useTimetableLectureFilter();

  const hasSearch = searchWord.input.length >= 2;
  const handleTagDeleteButtonHandler = () => {
    setSearchWord({ input: '' });
    setKeyword('');
    setProfessor('');
  };

  return (
    <div className="h-[42px] rounded-xl w-[270px] flex items-center gap-2 text-base border-gray-200 border-[1px]">
      {hasSearch ? (
        <div className="pl-3 flex gap-2 items-center">
          <p className="text-base text-gray-400">검색어</p>
          <Tag value={searchWord.input} deletable={true} onClick={handleTagDeleteButtonHandler} />
        </div>
      ) : (
        <div className="w-full h-full rounded-xl hover:bg-gray-100">
          <button
            onClick={searchDialogOpen}
            className="flex ml-3 items-center gap-2 text-gray-400  w-full h-full text-left"
          >
            <MagnifyingGlassIcon />
            <p>과목명·교수명</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchInput;
