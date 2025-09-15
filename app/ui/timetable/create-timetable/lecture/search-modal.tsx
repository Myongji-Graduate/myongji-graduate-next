import Button from '@/app/ui/view/atom/button/button';
import TextInput from '@/app/ui/view/atom/text-input/text-input';
import Modal from '@/app/ui/view/molecule/modal/modal';
import RadioGroup from '@/app/ui/view/molecule/radio-group/radio-group';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { useState } from 'react';
import { DEFAULT_SEARCH_OPTION, SEARCH_OPTIONS } from '../create-timetable-constants';

function SearchModal() {
  const [value, setValue] = useState<string>(DEFAULT_SEARCH_OPTION);

  return (
    <Modal
      modalKey={DIALOG_KEY.LECTURE_NAME_OR_PROFESSOR_SEARCH}
      onClose={() => {
        setTimeout(() => {
          setValue(DEFAULT_SEARCH_OPTION);
        }, 200);
      }}
    >
      <div className="max-lg:w-72 p-1 pb-6">
        <h1 className="font-semibold">검색어</h1>
        <div className="text-sm text-center my-4">
          <RadioGroup name="" value={value} onChange={setValue} options={SEARCH_OPTIONS} />
        </div>
        <div className="w-full flex gap-2">
          <TextInput placeholder="검색어를 입력하세요." />
          <Button label="검색" className="w-20 text-sm" />
        </div>
      </div>
    </Modal>
  );
}

export default SearchModal;
