import '@/app/ui/view/molecule/pie-chart/pie-chart.css';
import { cn } from '@/app/utils/shadcn/utils';

export interface PieChartProp {
  percentage: number;
}

function PieChart({ percentage }: PieChartProp) {
  const filterdPercentage = percentage > 100 ? 100 : percentage;

  return (
    <div
      className={cn(
        'piechart relative aspect-square rounded-full  w-[9rem] h-[9rem]',
        percentage === 100 ? 'bg-light-blue-1 complete' : 'bg-etc-pink',
      )}
      style={{ '--percentage': percentage }}
    >
      <div
        className={cn(
          'absolute rounded-full bg-white  font-bold text-xl w-[6rem] h-[6rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
          percentage === 100 ? 'text-light-blue-6' : 'text-etc-red',
        )}
      >
        {filterdPercentage}%
      </div>
    </div>
  );
}

export default PieChart;
