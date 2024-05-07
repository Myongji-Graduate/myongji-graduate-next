export const getPercentage = (numerator: number, denominator: number) => {
  return Number(((numerator / denominator) * 100).toFixed(0));
};
