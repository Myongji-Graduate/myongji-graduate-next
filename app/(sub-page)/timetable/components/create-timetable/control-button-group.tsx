'use client';

import useDialog from '@/app/hooks/useDialog';
import Button from '@/app/ui/view/atom/button/button';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';
import ClearTimetableButton from './clear-timetable-button';
import { MAX_WIDTH, MIN_WIDTH } from '@/app/ui/timetable/create-timetable/create-timetable-constants';
import DeleteTimetableButton from './delete-timetable-button';
import SaveTimetableButton from './save-timetable-button';

function ControlButtonGroup() {
  const { isOpen, open } = useDialog(DIALOG_KEY.TIMETABLE_LECTURE_SEARCH);

  const AddButton = (
    <Button label="과목 추가" size="xs" tabIndex={isOpen ? -1 : 0} onClick={open} className="h-[42px]" />
  );

  const ActionButtons = (
    <div className="flex gap-2">
      <ClearTimetableButton />
      <SaveTimetableButton />
      <DeleteTimetableButton />
    </div>
  );

  return (
    <div>
      {/* 395px 이상 */}
      <Responsive minWidth={MIN_WIDTH}>
        <div className="flex justify-between">
          {AddButton}
          {ActionButtons}
        </div>
      </Responsive>

      {/* 395px 이하 */}
      <Responsive maxWidth={MAX_WIDTH}>
        <div className="flex flex-col gap-2">
          <div className="w-[100px]">{AddButton}</div>
          {ActionButtons}
        </div>
      </Responsive>
    </div>
  );
}

export default ControlButtonGroup;
