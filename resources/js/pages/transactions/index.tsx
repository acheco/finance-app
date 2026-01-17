import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import DeleteTransaction from '@/components/delete-transaction';
import Icon from '@/components/icon';
import LockedField from '@/components/locked-field';
import TablePagination from '@/components/table-pagination';
import TransactionFilters from '@/components/transaction-filter';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
} from '@/components/ui/empty';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-is-mobile';
import AppLayout from '@/layouts/app-layout';
import { cn, currencyFormat } from '@/lib/utils';
import { PaginatedTransactions } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
  ArrowsDownUpIcon,
  DotsThreeIcon,
  PencilSimpleLineIcon,
} from '@phosphor-icons/react';

interface TransactionsPageProps {
  transactions: PaginatedTransactions;
  transactionTypes: { id: number; name: string }[];
  categories: { id: number; name: string; transaction_type_id: number }[];
  usedCategories: { id: number; name: string }[];
  accounts: { id: number; name: string }[];
  suppliers: { id: number; name: string; category_id: number }[];
  filters: {
    search: string;
    category_id: string;
    order_direction: 'asc' | 'desc';
  };
}

export default function Transactions({
  transactions,
  usedCategories,
  filters,
}: TransactionsPageProps) {
  const isMobile = useIsMobile();

  return (
    <AppLayout title="Transactions">
      <Head title="Transactions" />

      {transactions.data.length === 0 ? (
        <section className="max-w-7xl p-4">
          <Empty className="bg-white">
            <EmptyHeader>
              <ArrowsDownUpIcon weight="fill" size={24} />
              <p>No transactions found.</p>
            </EmptyHeader>
            <EmptyDescription>
              Record your purchases, payments, and transfers to maintain an
              accurate view of your finances.
            </EmptyDescription>
            <EmptyContent>
              <Link href={TransactionController.create()}>
                <Button className="cursor-pointer">Register Transaction</Button>
              </Link>
            </EmptyContent>
          </Empty>
        </section>
      ) : (
        <section className="m-4 max-w-7xl rounded-md bg-white shadow-sm">
          <div className="flex w-full items-center justify-between gap-4 px-5 py-6">
            <TransactionFilters
              filters={filters}
              usedCategories={usedCategories}
            />

            <Link href={TransactionController.create()}>
              <Button className="cursor-pointer">+</Button>
            </Link>
          </div>

          <div className="px-5">
            <Table className="">
              <TableHeader>
                <TableRow
                  className={cn(
                    'hidden text-xs sm:table-row',
                    isMobile && 'border-none',
                  )}
                >
                  <TableHead className="text-grey-500">
                    Recipient / Sender
                  </TableHead>
                  <TableHead className="text-grey-500">Category</TableHead>
                  <TableHead className="text-grey-500">Date</TableHead>
                  <TableHead className="w-[150px] text-end text-grey-500">
                    Amount
                  </TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.data.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {isMobile ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="rounded-full p-2"
                            style={{ backgroundColor: transaction.color }}
                          >
                            <Icon
                              name={transaction.icon}
                              weight="fill"
                              color="white"
                            />
                          </div>
                          <div>
                            <p className="font-bold">
                              {transaction.supplier ?? 'No Supplier'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {transaction.category}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div
                            className="rounded-full p-2"
                            style={{ backgroundColor: transaction.color }}
                          >
                            <Icon
                              name={transaction.icon}
                              weight="fill"
                              color="white"
                            />
                          </div>
                          <div>
                            <p className="font-bold">
                              {transaction.supplier ?? 'No Supplier'}
                            </p>
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="hidden text-xs text-grey-500 sm:table-cell">
                      {transaction.category}
                    </TableCell>
                    <TableCell className="hidden text-xs text-grey-500 sm:table-cell">
                      {transaction.transaction_date.toString()}
                    </TableCell>
                    <TableCell
                      className={cn(
                        'w-[150px] text-end font-bold',
                        transaction.transaction_type.toLowerCase() ===
                          'income' && 'text-green-custom',
                      )}
                    >
                      {transaction.transaction_type.toLowerCase() ===
                        'expense' && (
                        <div>
                          <p className="text-sm">
                            -{currencyFormat(transaction.amount)}
                          </p>
                          {isMobile && (
                            <p className="text-xs font-normal text-grey-500">
                              {transaction.transaction_date.toString()}
                            </p>
                          )}
                        </div>
                      )}
                      {transaction.transaction_type.toLowerCase() ===
                        'income' && (
                        <div>
                          <p className="text-sm">
                            +{currencyFormat(transaction.amount)}
                          </p>
                          {isMobile && (
                            <p className="text-xs font-normal text-grey-500">
                              {transaction.transaction_date.toString()}
                            </p>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="w-[40px]">
                      {transaction.can.update || transaction.can.delete ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <DotsThreeIcon weight="regular" size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {transaction.can.delete && (
                              <DropdownMenuItem asChild>
                                <DeleteTransaction transaction={transaction} />
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            {transaction.can.update && (
                              <DropdownMenuItem asChild>
                                <Link
                                  href={TransactionController.edit(transaction)}
                                  className="w-full justify-start px-3 py-2"
                                >
                                  <PencilSimpleLineIcon
                                    weight="fill"
                                    color="#826CB0"
                                  />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <LockedField />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination links={transactions.links} className={'py-6'} />
          </div>
        </section>
      )}
    </AppLayout>
  );
}
