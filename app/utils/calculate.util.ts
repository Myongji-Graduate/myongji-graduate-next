export const getPercentage = (numerator: number, denominator: number) => {
  if (numerator >= denominator) return 100;
  const percentage = Number(((numerator / denominator) * 100).toFixed(0));
  if (denominator === 0) return 0;
  return percentage > 100 ? 100 : percentage;
};
