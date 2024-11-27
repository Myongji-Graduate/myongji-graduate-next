'use client';
import { Table } from '../../view/molecule/table';
import DeleteTakenLectureButton from './delete-taken-lecture-button';
import { deleteTakenLecture } from '@/app/business/services/lecture/taken-lecture.command';
import { useToast } from '../../view/molecule/toast/use-toast';
import Responsive from '../../responsive';
import { TAKEN_LECTURE_TABLE_HEADER_INFO } from './taken-lecture-constant';
import { useTakenLecture } from '@/app/business/hooks/use-taken-lecture.hook';
import { TakenLectrueInfo } from '@/app/store/stores/custom-taken-lecture';

export default function TakenLectureList() {
  const { optimisticLecture, deleteOptimisticLecture, deleteLecture } = useTakenLecture();

  const { toast } = useToast();

  const handleDeleteTakenLecture = async (item: TakenLectrueInfo) => {
    deleteOptimisticLecture(item.lectureId);
    const result = await deleteTakenLecture(item.id);
    if (!result.isSuccess) {
      return toast({
        title: `${item.lectureName} 삭제에 실패했습니다.`,
        variant: 'destructive',
      });
    }
    deleteLecture(item.id);
    toast({
      title: `${item.lectureName} 과목을 삭제했습니다.`,
    });
  };

  return (
    <>
      <Responsive minWidth={1024}>
        <Table
          headerInfo={TAKEN_LECTURE_TABLE_HEADER_INFO}
          data={optimisticLecture}
          renderActionButton={(item: TakenLectrueInfo) => (
            <DeleteTakenLectureButton item={item} onDelete={handleDeleteTakenLecture} />
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
