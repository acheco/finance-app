import BudgetCard from '@/components/budget-card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Budgets() {
  return (
    <AppLayout title="Budgets">
      <Head title="Budgets" />

      <div className="flex flex-col items-center gap-2">
        <section></section>
        <section className="flex flex-col items-center gap-4">
          <BudgetCard />
        </section>
      </div>
    </AppLayout>
  );
}
