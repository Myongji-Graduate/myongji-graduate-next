'use client';

import List from '@/app/ui/view/molecule/list';
import { ListRow } from '@/app/ui/view/molecule/list/list-root';
import TimetableLectureFilters from './timetable-lecture-filters';
import LectureRowDesktop from './lecture-row-desktop';
import LectureRowMobile from './lecture-row-mobile';
import Responsive from '@/app/ui/responsive';
import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';
import { Suspense } from 'react';
import { TimetableLectureRow } from '@/app/type/timetable/types';
import { useFetchSearchTimetableLecture } from '@/app/store/querys/timetable-lecture';

function TimetableLectureSearch() {
  const { addLecture } = useTimetableLecture();

  const handleAddLecture = (item: TimetableLectureRow) => {
    addLecture(item);
  };

  const { data } = useFetchSearchTimetableLecture();

  const render = (item: ListRow, index: number) => (
    <List.Row
      data-cy={`timetable-lecture-${item.id}`}
      key={item.id ?? index}
      onClick={() => handleAddLecture(item as TimetableLectureRow)}
    >
      <Responsive minWidth={1000}>
        <LectureRowDesktop item={item} />
      </Responsive>
      <Responsive maxWidth={999}>
        <LectureRowMobile item={item} />
      </Responsive>
    </List.Row>
  );

  const EmptyDataRender = () => {
    return (
      <div>
        <p className="text-gray-400">해당 데이터가 존재하지 않습니다.</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="px-2">
        <TimetableLectureFilters />
      </div>
      <Suspense
        fallback={
          <div className="rounded-xl border-[1px] border-gray-300 w-full h-72 overflow-auto flex justify-center items-center">
            <LoadingSpinner
              className={'animate-spin shrink-0 h-12 w-12 mr-1.5 -ml-1 fill-gray-400'}
              style={{ transition: `width 150ms` }}
            />
          </div>
        }
      >
        <List data={data} render={render} isScrollList={true} emptyDataRender={EmptyDataRender} />
      </Suspense>
    </div>
  );
}

export default TimetableLectureSearch;
