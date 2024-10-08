'use client';
import '@/app/ui/view/molecule/pie-chart/pie-chart.css';
import { cn } from '@/app/utils/shadcn/utils';
import { useMediaQuery } from 'usehooks-ts';

export interface PieChartProp {
  percentage: number;
}

function PieChart({ percentage }: PieChartProp) {
  const isDesktop = useMediaQuery('(min-width: 767px)');

  return (
    <div
      className={cn(
        'relative aspect-square rounded-full w-[6.5rem] h-[6.5rem]',
        percentage > 0 && 'piechart',
        percentage === 100 ? 'bg-light-blue-1 complete' : 'bg-etc-pink',
        'md:w-[9rem] md:h-[9rem]',
      )}
      style={{
        '--percentage': percentage,
        '--startRadius': isDesktop ? '1.5rem' : '1.1rem',
        '--endRadius': isDesktop ? '0.74rem' : '0.50rem',
        '--pieSize': isDesktop ? '9rem' : '6.5rem',
      }}
    >
      <div
        className={cn(
          'absolute rounded-full bg-white text-base font-bold w-[4.5rem] h-[4.5rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
          percentage === 100 ? 'text-light-blue-6' : 'text-etc-red',
          'md:w-[6rem] md:h-[6rem] md:text-xl ',
        )}
      >
        {percentage}%
      </div>
    </div>
  );
}

export default PieChart;
