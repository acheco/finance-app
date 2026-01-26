import BudgetForm from '@/components/budget-form';
import DeleteBudgetForm from '@/components/delete-budget-form';
import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn, currencyFormat } from '@/lib/utils';
import transactions from '@/routes/transactions';
import { Budget, BudgetFormProps } from '@/types';
import { Link } from '@inertiajs/react';
import {
  ArrowsDownUpIcon,
  CaretRightIcon,
  DotsThreeIcon,
} from '@phosphor-icons/react';

interface BudgetCardProps {
  budget: Budget;
  categories: BudgetFormProps['categories'][];
  currencies: BudgetFormProps['currencies'][];
  budgetPeriod: BudgetFormProps['budgetPeriod'][];
}

export default function BudgetCard({
  budget,
  budgetPeriod,
  currencies,
  categories,
}: BudgetCardProps) {
  const color = budget.category.color;

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <div
            className="h-[16px] w-[16px] rounded-full"
            style={{ backgroundColor: color }}
          />
          {budget.category.name}
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center">
                <DotsThreeIcon color="text-grey-300" height={16} width={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <BudgetForm
                  mode="edit"
                  categories={categories}
                  currencies={currencies}
                  budgetPeriod={budgetPeriod}
                  defaultValues={budget}
                />
              </DropdownMenuItem>
              <Separator className="my-1" />
              <DropdownMenuItem asChild>
                <DeleteBudgetForm budget={budget} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div>
          <p className="pb-4 text-sm text-grey-500">
            Maximum of ${budget.formatedBudgetAmount}
          </p>
          <div className="flex h-[32px] items-center rounded-sm bg-beige-100 px-1">
            <Progress
              value={budget.spent_amount}
              max={budget.budget_amount}
              progressColor={color}
              className={cn(
                `h-[24px] w-full rounded-sm bg-beige-100 [&>div]:rounded-sm`,
              )}
            />
          </div>
        </div>
        <div className="mt-4 flex h-[43px] justify-start text-sm text-grey-500">
          <div className="flex items-center gap-4" style={{ width: '50%' }}>
            <div
              className={cn('h-full w-1 rounded-md')}
              style={{ backgroundColor: color }}
            />
            <div className="space-y-1">
              <p className="text-xs">Spent</p>
              <p className="font-bold text-black">{budget.spent_amount}</p>
            </div>
          </div>
          <div className={'flex items-center gap-4'}>
            <div className={cn('h-full w-1 rounded-md bg-beige-100')} />
            <div className="space-y-1">
              <p className="text-xs">Remaining</p>
              <p className="text-sm font-bold text-black">
                {budget.remaining_amount}
              </p>
            </div>
          </div>
        </div>
        {budget.recent_transactions && budget.recent_transactions.length > 0 ? (
          <div className="mt-5 rounded-md bg-beige-100 p-4">
            <div className="bg-beige-100v flex items-center justify-between pb-5">
              <h2 className="text-sm font-bold">Latest Spending</h2>
              <Button
                variant="link"
                className="text-sm text-grey-500"
                size="sm"
              >
                See All <CaretRightIcon weight="fill" color="#696969" />
              </Button>
            </div>
            <Table>
              <TableBody>
                {budget.recent_transactions.map((transaction) => {
                  return (
                    <TableRow key={transaction.id} className="h-[40px]">
                      <TableCell className="flex items-center gap-2 px-0 text-xs font-bold">
                        <div
                          className="grid h-8 w-8 place-content-center rounded-full"
                          style={{ backgroundColor: color }}
                        >
                          {transaction.supplier.logo ? (
                            <img
                              src={transaction.supplier.logo}
                              alt="Supplier Logo"
                              className="rounded-full border-none"
                            />
                          ) : (
                            <Icon
                              name={budget.category.icon}
                              color="white"
                              size={18}
                            />
                          )}
                        </div>
                        {transaction?.supplier.name}
                      </TableCell>
                      <TableCell className="text-right">
                        <p className="pb-1 text-xs font-bold">
                          -{currencyFormat(transaction.amount)}
                        </p>
                        <p className="text-xs text-grey-500">
                          {transaction.transaction_date.split('T')[0]}
                        </p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <Empty className="mt-5 bg-beige-100">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ArrowsDownUpIcon size={16} />
              </EmptyMedia>
              <EmptyTitle>No Transactions Found</EmptyTitle>
              <EmptyDescription>
                Here you will see the latest transactions for your budgets
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href={transactions.create().url}>
                <Button>Add Transaction</Button>
              </Link>
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
    </Card>
  );
}
