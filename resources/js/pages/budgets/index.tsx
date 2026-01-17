import BudgetCard from '@/components/budget-card';
import BudgetForm from '@/components/budget-form';
import BudgetChartCard from '@/components/charts/budget-chart-card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import AppLayout from '@/layouts/app-layout';
import { Budget, BudgetChartData, BudgetFormProps } from '@/types';
import { Head } from '@inertiajs/react';
import { ChartDonutIcon } from '@phosphor-icons/react';

interface BudgetsProps {
  budgets: Budget[];
  categories: BudgetFormProps['categories'][];
  budgetPeriod: BudgetFormProps['budgetPeriod'][];
  budgetChartData: BudgetChartData[];
}

export default function Budgets({
  budgets,
  categories,
  budgetPeriod,
  budgetChartData,
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
        <div className="grid max-w-7xl gap-6 px-4 sm:px-10 lg:grid-cols-[minmax(320px,428px)_1fr] lg:pl-0">
          <div className="">
            <BudgetChartCard budgets={budgetChartData} />
          </div>
          <div className="space-y-4">
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </div>
      ) : (
        <Empty className="max-w-7xl">
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
