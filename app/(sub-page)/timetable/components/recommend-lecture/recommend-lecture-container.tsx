import RecommendLectureList from './recommend-lecture-list';

const recommendLectureList = [
  //추후 api로 받아오기
  {
    semester: '4-1',
    credit: 18,
    lectures: [
      { id: '1', code: 'CSE1001', name: '컴퓨터 공학 개론', type: '전공선택', credit: 3 },
      { id: '2', code: 'MAT2001', name: '이산수학', type: '전공필수', credit: 3 },
    ],
  },
  {
    semester: '4-2',
    credit: 10,
    lectures: [{ id: '3', code: 'CSE1002', name: '운영체제', type: '전공필수', credit: 3 }],
  },
];

function RecommendLectureContainer() {
  return (
    <div className="py-2">
      {recommendLectureList.map((semester) => (
        <div key={semester.semester} className="mb-6 flex flex-col gap-3">
          <p className="font-bold text-base md:text-lg">
            {semester.semester} [총 {semester.credit}학점]
          </p>
          <RecommendLectureList lectures={semester.lectures} />
        </div>
      ))}
    </div>
  );
}

export default RecommendLectureContainer;
