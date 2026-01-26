import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Separator } from '@/components/ui/separator';
import { currencyFormat } from '@/lib/utils';
import { Budget } from '@/types';
import { ChartDonutIcon } from '@phosphor-icons/react';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

interface BudgetChartCardProps {
  budgets: Budget[];
}

export default function BudgetChartCard({ budgets }: BudgetChartCardProps) {
  const totalBudgetAmount = React.useMemo(() => {
    return budgets.reduce((acc, curr) => acc + Number(curr.budget_amount), 0);
  }, [budgets]);

  const totalSpentAmount = React.useMemo(() => {
    return budgets.reduce((acc, curr) => acc + Number(curr.spent_amount), 0);
  }, [budgets]);

  const currency = budgets[0].currency.code;

  const formattedBudgetAmount = currencyFormat(totalBudgetAmount, currency);

  const chartData = React.useMemo(() => {
    return budgets
      .filter((item) => Number(item.spent_amount) > 0)
      .map((item) => ({
        categoryName: item.category.name,
        amount: Number(item.spent_amount),
        fill: item.category.color,
      }));
  }, [budgets]);

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      amount: { label: 'Expense' },
    };

    budgets.forEach((budget) => {
      config[budget.category.name] = {
        label: budget.category.name,
        color: budget.category.color,
      };
    });

    return config;
  }, [budgets]);

  return (
    <Card className="flex w-full md:flex-row lg:flex-col">
      <CardContent className="w-full flex-1 pb-0">
        {totalSpentAmount > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent nameKey="categoryName" indicator="dot" />
                }
              />
              <Pie
                key={budgets[0].id}
                data={chartData}
                dataKey="amount"
                nameKey="categoryName"
                innerRadius={'70%'}
                outerRadius={'90%'}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-[35px] font-bold"
                          >
                            ${totalSpentAmount.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 28}
                            className="fill-muted-foreground"
                          >
                            of {formattedBudgetAmount} limit
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <Pie
                key={budgets[0].category.name}
                data={chartData}
                dataKey="amount"
                nameKey="categoryName"
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                isAnimationActive={true}
                opacity="75%"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ChartDonutIcon weight="fill" />
              </EmptyMedia>
              <EmptyTitle>No Transactions Found</EmptyTitle>
              <EmptyDescription>
                you haven't register any transaction yet. Get started
                registering your first transaction for any budget first.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-6 md:flex-1">
        <h2 className="text-left text-xl font-bold">Spending Summary</h2>
        <div className="w-full space-y-4">
          {budgets.map((budget, index) => (
            <div key={index}>
              <div className="flex items-center justify-between gap-2">
                <div
                  className="flex items-center gap-4"
                  data-testid="budget-name"
                >
                  <span
                    className="h-[21px] w-1 rounded-full bg-current"
                    style={{ backgroundColor: budget.category.color }}
                  />
                  <span className="text-sm text-grey-500">
                    {budget.category.name}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2"
                  data-testid="budget-amount"
                >
                  <span className="text-[16px] font-bold">
                    {currencyFormat(budget.spent_amount)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    of {currencyFormat(budget.budget_amount)}
                  </span>
                </div>
              </div>
              {index < budgets.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
