function getCurrentYear() {
  const now = new Date();
  return now.getFullYear();
}

function getCurrentSemester() {
  const now = new Date();
  const month = now.getMonth() + 1;

  return month <= 6 ? 1 : 2;
}

export const CURRENT_YEAR = getCurrentYear();
export const CURRENT_SEMESTER = getCurrentSemester();

export const TIMETABLE_LECTURE_PAGE = 1;
export const TIMETABLE_LECTURE_LIMIT = 10;
