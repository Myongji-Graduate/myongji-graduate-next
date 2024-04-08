'use client';
import { Table } from '../../view/molecule/table';
import DeleteTakenLectureButton from './delete-taken-lecture-button';
import { takenLectureAtom } from '@/app/store/custom-taken-lecture';
import { useOptimistic } from 'react';
import { useAtom } from 'jotai';
import { fetchDeleteLecture } from '@/app/business/lecture/taken-lecture.command';
import { useToast } from '../../view/molecule/toast/use-toast';

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

export default function TakenLectureList() {
  const [takenLectures, setTakenLectures] = useAtom(takenLectureAtom);
  const { toast } = useToast();

  const [optimisticLecture, deleteOptimisticLecture] = useOptimistic(
    takenLectures,
    (currentTakenLectures, lectureId) => {
      return currentTakenLectures.filter((lecture) => lecture.id !== lectureId);
    },
  );
  const handleLectureDelete = async (lectureId: number) => {
    deleteOptimisticLecture(lectureId);
    const result = await fetchDeleteLecture(lectureId);
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
      {/* pc  */}
      <div className="hidden lg:block">
        <Table
          headerInfo={headerInfo}
          data={optimisticLecture}
          renderActionButton={(id: number) => (
            <DeleteTakenLectureButton lectureId={id} handleDelete={handleLectureDelete} />
          )}
        />
      </div>
      {/* mobile */}
      <div className="block lg:hidden">
        <Table headerInfo={headerInfo} data={optimisticLecture} onSwipeAction={handleLectureDelete} swipeable={true} />
      </div>
    </>
  );
}
