interface PieChartProp {
  percentage: number;
}

function PieChart({ percentage }: PieChartProp) {
  const filterdPercentage = percentage > 100 ? 100 : percentage;

  return (
    <div
      className={`piechart relative aspect-square rounded-full bg-light-blue-1 w-[8rem] h-[8rem]`}
      style={{ '--percentage': percentage }}
    >
      <div className="absolute rounded-full bg-white text-primary font-bold text-xl w-[6rem] h-[6rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        {filterdPercentage}%
      </div>
    </div>
  );
}

export default PieChart;
