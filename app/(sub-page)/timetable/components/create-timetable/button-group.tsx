'use client';

import Responsive from '@/app/ui/responsive';
import SaveTimetableButton from './save-timetable-button';
import ClearTimetableTrigger from './clear-timetable-trigger';
import DeleteTimetableTrigger from './delete-timetable-trigger';
import RecommendLectureTrigger from './recommend-lecture-trigger';
import AddLectureTrigger from './add-lecture-trigger';

function ButtonGroup() {
  const LectureButtons = (
    <div className="flex gap-2">
      <AddLectureTrigger />
      <RecommendLectureTrigger />
    </div>
  );

  const ActionButtons = (
    <div className="flex gap-2">
      <ClearTimetableTrigger />
      <SaveTimetableButton />
      <DeleteTimetableTrigger />
    </div>
  );

  return (
    <div>
      <Responsive minWidth={560}>
        <div className="flex justify-between">
          {LectureButtons}
          {ActionButtons}
        </div>
      </Responsive>

      <Responsive maxWidth={559}>
        <div className="flex flex-col gap-2">
          {LectureButtons}
          {ActionButtons}
        </div>
      </Responsive>
    </div>
  );
}

export default ButtonGroup;
