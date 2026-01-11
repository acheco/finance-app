import BudgetCard from '@/components/budget-card';
import AppLayout from '@/layouts/app-layout';
import { Budget } from '@/types';
import { Head } from '@inertiajs/react';

interface BudgetsProps {
  budgets: Budget[];
}

export default function Budgets({ budgets }: BudgetsProps) {
  return (
    <AppLayout
      title="Budgets"
      withCreateButton={true}
      createButtonLabel="+ Add New"
      createButtonHref={'/budgets/create'}
    >
      <Head title="Budgets" />
      <div className="flex flex-col items-center gap-2">
        <section></section>
        <section className="flex flex-col items-center gap-4">
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </section>
      </div>
    </AppLayout>
  );
}
