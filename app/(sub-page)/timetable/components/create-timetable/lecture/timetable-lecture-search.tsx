'use client';

import { Suspense, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import List from '@/app/ui/view/molecule/list';
import { ListRow } from '@/app/ui/view/molecule/list/list-root';
import TimetableLectureFilters from './timetable-lecture-filters';
import LectureRowDesktop from './lecture-row-desktop';
import LectureRowMobile from './lecture-row-mobile';
import Responsive from '@/app/ui/responsive';

import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import { TimetableLectureRow } from '@/app/business/services/timetable/timetable.type';
import { useFetchSearchTimetableLecture } from '@/app/business/services/timetable/timetable-lecture.query';

import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';
import { useToast } from '@/app/ui/view/molecule/toast/use-toast';

function LectureList() {
  const { addLecture } = useTimetableLecture();
  const { toast } = useToast();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } = useFetchSearchTimetableLecture();

  const { ref, inView } = useInView();

  const lectures = data?.pages.flatMap((p) => p.data) ?? [];

  const shouldEnableInfiniteScroll = lectures.length >= 10;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && shouldEnableInfiniteScroll) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, shouldEnableInfiniteScroll]);

  useEffect(() => {
    if (isError) {
      toast({ title: '검색 중 오류가 발생했습니다.', variant: 'destructive' });
    }
  }, [isError, toast]);

  const EmptyData = () => (
    <div className="py-20 flex justify-center">
      <p className="text-gray-400">해당 데이터가 존재하지 않습니다.</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="rounded-xl border-[1px] border-gray-300 w-full h-72 overflow-auto flex justify-center items-center">
        <LoadingSpinner className="animate-spin h-12 w-12 fill-gray-400" />
      </div>
    );
  }

  if (lectures.length === 0) return <EmptyData />;

  return (
    <List
      data={lectures}
      isScrollList
      render={(item: ListRow, index: number) => (
        <List.Row key={item.id} onClick={() => addLecture(item as TimetableLectureRow)}>
          <Responsive minWidth={1000}>
            <LectureRowDesktop item={item} />
          </Responsive>
          <Responsive maxWidth={999}>
            <LectureRowMobile item={item} />
          </Responsive>
          {index === lectures.length - 1 && hasNextPage && shouldEnableInfiniteScroll && (
            <div ref={ref} className="h-10"></div>
          )}
        </List.Row>
      )}
      emptyDataRender={EmptyData}
    />
  );
}

export default function TimetableLectureSearch() {
  return (
    <div className="flex flex-col gap-4 pt-6 h-96">
      <div className="px-2 flex flex-col gap-2">
        <TimetableLectureFilters />
        <p className="text-gray-400 text-sm">※ 해당 학기에 개설되는 강의만 보여집니다.</p>
      </div>
      <Suspense
        fallback={
          <div className="rounded-xl border-[1px] border-gray-300 w-full h-72 overflow-auto flex justify-center items-center">
            <LoadingSpinner className="animate-spin h-12 w-12 fill-gray-400" />
          </div>
        }
      >
        <LectureList />
      </Suspense>
    </div>
  );
}
