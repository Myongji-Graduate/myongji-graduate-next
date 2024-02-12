import RevenueChart from '@/app/component/[domain-name]/revenu-chart';
import { RevenueChartSkeleton } from '@/app/component/skeletons';
import { Suspense } from 'react'; 


export default async function Page() {
    // const revenue = await fetchRevenue();

  return (
    <main>
      <h1 className={"mb-4 text-xl md:text-2xl"}>
        Dashboard
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
      </div>
    </main>
  );
}