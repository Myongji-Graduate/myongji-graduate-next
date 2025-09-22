import Button from '@/app/ui/view/atom/button/button';
import TextInput from '@/app/ui/view/atom/text-input/text-input';
import Modal from '@/app/ui/view/molecule/modal/modal';
import RadioGroup from '@/app/ui/view/molecule/radio-group/radio-group';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { useState } from 'react';
import { DEFAULT_SEARCH_OPTION, SEARCH_OPTIONS } from '../create-timetable-constants';
import { useTimetableLectureFilter } from '@/app/business/hooks/use-timetable-lecture-filter.hook';
import useDialog from '@/app/hooks/useDialog';
import { useSetAtom } from 'jotai';
import { timetableLectureSearchWordAtom } from '@/app/store/stores/timetable-lecture';

function SearchModal() {
  const [value, setValue] = useState<string>(DEFAULT_SEARCH_OPTION);
  const setSearchWord = useSetAtom(timetableLectureSearchWordAtom);
  const [input, setInput] = useState<string>('');

  const { setKeyword, setProfessor } = useTimetableLectureFilter();
  const { close } = useDialog(DIALOG_KEY.LECTURE_NAME_OR_PROF_SEARCH);

  const handleSearch = () => {
    if (value === 'subject') {
      setKeyword(input);
      setProfessor('');
    } else if (value === 'professor') {
      setProfessor(input);
      setKeyword('');
    }
    setSearchWord({ input });
    close();
    setValue(DEFAULT_SEARCH_OPTION);
    setInput('');
  };

  return (
    <Modal
      modalKey={DIALOG_KEY.LECTURE_NAME_OR_PROF_SEARCH}
      onClose={() => {
        setTimeout(() => {
          setValue(DEFAULT_SEARCH_OPTION);
          setInput('');
        }, 200);
      }}
    >
      <div className="max-lg:w-72 p-1 pb-6">
        <h1 className="font-semibold">검색어</h1>
        <p className="text-gray-400 text-sm">2글자 이상 작성해주세요.</p>
        <div className="text-sm text-center my-4">
          <RadioGroup name="" value={value} onChange={setValue} options={SEARCH_OPTIONS} />
        </div>
        <div className="w-full flex gap-2">
          <TextInput placeholder="검색어를 입력하세요." value={input} onValueChange={(value) => setInput(value)} />
          <Button disabled={input.length < 2} label="검색" className="w-20 text-sm" onClick={handleSearch} />
        </div>
      </div>
    </Modal>
  );
}

export default SearchModal;
