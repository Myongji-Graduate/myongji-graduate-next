import RevenueChart from '@/app/ui/invoice/revenu-chart';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import TakenLecture from '@/app/ui/lecture/taken-lecture';

export default async function Page() {
  return (
    <main>
      <h1 className={'mb-4 text-xl md:text-2xl'}>Dashboard</h1>
      <div className="mt-6">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <TakenLecture />
        </Suspense>
      </div>
    </main>
  );
}
