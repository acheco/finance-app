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
import { BudgetChartData } from '@/types';
import { ChartDonutIcon } from '@phosphor-icons/react';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

interface ChartPieDonutTextProps {
  budgets: BudgetChartData[];
}

export default function ChartPieDonutText({ budgets }: ChartPieDonutTextProps) {
  const totalBudgetAmount = React.useMemo(() => {
    return budgets.reduce((acc, curr) => acc + curr.budget_amount, 0);
  }, [budgets]);

  const totalSpentAmount = React.useMemo(() => {
    return budgets.reduce((acc, curr) => acc + curr.spent_amount, 0);
  }, [budgets]);

  const formattedBudgetAmount = currencyFormat(totalBudgetAmount);

  const chartData = React.useMemo(() => {
    return budgets.map((item) => ({
      ...item,
      fill: item.color,
    }));
  }, [budgets]);

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      budget_amount: {
        label: 'Amount',
      },
    };

    budgets.forEach((budget) => {
      config[budget.name] = {
        label: budget.name,
        color: budget.color,
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
            className="mx-auto aspect-square"
          >
            <PieChart
              style={{
                width: '100%',
                maxWidth: '300px',
                maxHeight: '80vh',
                aspectRatio: 1,
                margin: '0 auto',
              }}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                key={budgets[0].id}
                data={chartData}
                dataKey="spent_amount"
                nameKey="name"
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
                            y={(viewBox.cy || 0) + 24}
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
                key={budgets[0].name}
                data={chartData}
                dataKey="spent_amount"
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
            <>
              <div
                key={budget.name}
                className="flex items-center justify-between gap-2"
              >
                <div
                  className="flex items-center gap-4"
                  data-testid="budget-name"
                >
                  <span
                    className="h-[21px] w-1 rounded-full bg-current"
                    style={{ backgroundColor: budget.color }}
                  />
                  <span className="text-sm text-grey-500">{budget.name}</span>
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
            </>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
