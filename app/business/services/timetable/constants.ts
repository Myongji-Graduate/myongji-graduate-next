export function getCurrentYear() {
  const now = new Date();
  return now.getFullYear();
}

export function getCurrentSemester() {
  const now = new Date();
  const month = now.getMonth() + 1;

  return month <= 6 ? 1 : 2;
}

export const CURRENT_YEAR = getCurrentYear();
export const CURRENT_SEMESTER = getCurrentSemester();
