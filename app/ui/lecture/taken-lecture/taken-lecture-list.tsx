'use client';
import { Table } from '../../view/molecule/table';
import DeleteTakenLectureButton from './delete-taken-lecture-button';
import { takenLectureAtom } from '@/app/store/custom-taken-lecture';
import { useOptimistic } from 'react';
import { useAtom } from 'jotai';
import { deleteTakenLecture } from '@/app/business/lecture/taken-lecture.command';
import { useToast } from '../../view/molecule/toast/use-toast';
import Responsive from '../../responsive';
import { TAKEN_LECTURE_TABLE_HEADER_INFO } from './taken-lecture-constant';

export default function TakenLectureList() {
  const [takenLectures, setTakenLectures] = useAtom(takenLectureAtom);
  const { toast } = useToast();

  const [optimisticLecture, deleteOptimisticLecture] = useOptimistic(
    takenLectures,
    (currentTakenLectures, lectureId) => {
      return currentTakenLectures.filter((lecture) => lecture.id !== lectureId);
    },
  );
  const handleDeleteTakenLecture = async (lectureId: number) => {
    deleteOptimisticLecture(lectureId);
    const result = await deleteTakenLecture(lectureId);
    if (!result.isSuccess) {
      return toast({
        title: '과목 삭제에 실패했습니다',
        variant: 'destructive',
      });
    }
    setTakenLectures(takenLectures?.filter((lecture) => lecture.id !== lectureId));
  };

  return (
    <>
      <Responsive minWidth={1024}>
        <Table
          headerInfo={TAKEN_LECTURE_TABLE_HEADER_INFO}
          data={optimisticLecture}
          renderActionButton={(id: number) => (
            <DeleteTakenLectureButton lectureId={id} onDelete={handleDeleteTakenLecture} />
          )}
        />
      </Responsive>
      <Responsive maxWidth={1023}>
        <Table
          headerInfo={TAKEN_LECTURE_TABLE_HEADER_INFO}
          data={optimisticLecture}
          onSwipeAction={handleDeleteTakenLecture}
          swipeable={true}
        />
      </Responsive>
    </>
  );
}
