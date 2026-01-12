import BudgetCard from '@/components/budget-card';
import BudgetForm from '@/components/budget-form';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import AppLayout from '@/layouts/app-layout';
import { Budget, BudgetFormProps } from '@/types';
import { Head } from '@inertiajs/react';
import { ChartDonutIcon } from '@phosphor-icons/react';

interface BudgetsProps {
  budgets: Budget[];
  categories: BudgetFormProps['categories'][];
  budgetPeriod: BudgetFormProps['budgetPeriod'][];
}

export default function Budgets({
  budgets,
  categories,
  budgetPeriod,
}: BudgetsProps) {
  return (
    <AppLayout
      title="Budgets"
      withCreateButton={true}
      createButtonLabel="+ Add New"
      createButtonHref={'/budgets/create'}
    >
      <Head title="Budgets" />
      {budgets.length ? (
        <div className="flex flex-col items-center gap-2">
          <section></section>
          <section className="flex flex-col items-center gap-4">
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </section>
        </div>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ChartDonutIcon weight="fill" />
            </EmptyMedia>
            <EmptyTitle className="font-bold">No Budgets Yet</EmptyTitle>
            <EmptyDescription>
              Create your first budget to have more control over your finance.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <BudgetForm
              mode="create"
              categories={categories}
              budgetPeriod={budgetPeriod}
            />
          </EmptyContent>
        </Empty>
      )}
    </AppLayout>
  );
}
