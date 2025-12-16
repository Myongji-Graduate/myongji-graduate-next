interface UnscheduledLectureProps {
  lectureName: string;
  handleDelete: () => void;
  lectureNote: string | null;
  lectureCredit: number;
}

function UnscheduledLecture({ lectureName, lectureCredit, lectureNote, handleDelete }: UnscheduledLectureProps) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex gap-2 items-center">
        <p className="text-sm font-semibold">
          {lectureName} ({lectureCredit})
        </p>
        {lectureNote && <p className="text-xs text-gray-400">[{lectureNote}]</p>}
      </div>
      <button
        className="text-gray-500 text-lg hover:text-gray-400 rounded-full"
        onClick={handleDelete}
        aria-label="delete"
      >
        ×
      </button>
    </div>
  );
}

export default UnscheduledLecture;
