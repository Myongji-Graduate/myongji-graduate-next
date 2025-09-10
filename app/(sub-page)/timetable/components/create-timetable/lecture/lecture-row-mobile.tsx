import { ListRow } from '@/app/ui/view/molecule/list/list-root';

function LectureRowMobile({ item }: { item: ListRow }) {
  return (
    <>
      <div className="flex flex-col gap-1 p-3 border-b-gray-200">
        <div className="flex gap-1">
          <p className="text-sm text-gray-600">[{item.lectureCode}]</p>
          <p className="font-semibold">{item.name}</p>
        </div>
        <p className="text-sm">
          {item.professor} · {item.credit}학점
        </p>
        <div className="text-sm flex gap-3">
          <p>
            {item.day1} {item.time1}
          </p>
          {item.day2 && item.time2 && (
            <p>
              {item.day2} {item.time2}
            </p>
          )}
        </div>
        <p className="text-sm text-gray-500">{item.lectureRoom}</p>
        {item.note && <p className="text-xs text-blue-600">{item.note}</p>}
      </div>
    </>
  );
}

export default LectureRowMobile;
