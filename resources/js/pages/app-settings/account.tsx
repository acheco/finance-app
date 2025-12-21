import AccountForm from '@/components/account-form';
import DeleteAccount from '@/components/delete-account';
import HeadingSmall from '@/components/heading-small';
import Icon from '@/components/icon';
import LockedField from '@/components/locked-field';
import SearchFilter from '@/components/search-filter';
import TablePagination from '@/components/table-pagination';
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
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import AppSettingsLayout from '@/layouts/settings/app-settings-layout';
import { cn, currencyFormat } from '@/lib/utils';
import { index as account } from '@/routes/accounts';
import { AccountType, PaginatedAccounts } from '@/types';
import { Head } from '@inertiajs/react';
import { DotsThreeIcon, PiggyBankIcon } from '@phosphor-icons/react';

interface AccountProps {
  accounts: PaginatedAccounts;
  currencies: { id: number; name: string; code: string; symbol: string }[];
  accountTypes: AccountType[];
  filters: {
    search: string;
  };
  orderDirection: 'asc' | 'desc';
}

export default function Account({
  accounts,
  currencies,
  accountTypes,
  filters,
  orderDirection,
}: AccountProps & { filters: { search: string } }) {
  return (
    <AppLayout title="App Settings">
      <Head title="Account settings" />

      <AppSettingsLayout>
        <HeadingSmall
          title="Accounts information"
          description="Manage your finance account information"
        />

        <div className="space-y-4">
          {accounts.data.length > 0 && (
            <div className="flex w-full items-center justify-between gap-4">
              <SearchFilter
                initialValue={filters.search}
                url={account().url}
                placeholder="Search Account"
                onlyProps={['accounts', 'filters']}
              />

              <AccountForm
                mode="create"
                currencies={currencies}
                accountTypes={accountTypes}
              />
            </div>
          )}
          <div className="rounded-md bg-white p-8 shadow-sm">
            {accounts.data.length === 0 ? (
              <Empty className="border border-dashed">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <PiggyBankIcon />
                  </EmptyMedia>
                </EmptyHeader>
                <EmptyTitle>No Account</EmptyTitle>
                <EmptyDescription>
                  You don't have any accounts yet. Create one to get started.
                </EmptyDescription>
                <EmptyContent>
                  <Button>New Account</Button>
                </EmptyContent>
              </Empty>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Name</TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Currency
                      </TableHead>
                      <TableHead className="hidden text-right sm:table-cell">
                        Initial Balance
                      </TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.data.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell className="max-w-[140px] overflow-y-auto font-medium">
                          <div className="flex items-center gap-1 lg:hidden">
                            <div
                              className={cn(`rounded-full p-2`)}
                              style={{ backgroundColor: account.color }}
                            >
                              <Icon
                                name={account.icon}
                                size={16}
                                weight="fill"
                                color="white"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span>{account.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {account.account_type}
                              </span>
                            </div>
                          </div>
                          <p className="hidden lg:table-cell">{account.name}</p>
                        </TableCell>
                        <TableCell className="hidden sm:items-center sm:gap-2 lg:flex">
                          <Icon
                            name={account.icon}
                            weight="fill"
                            size={16}
                            color={account.color}
                          />
                          <span>{account.account_type}</span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {account.currency}
                        </TableCell>
                        <TableCell className="hidden text-right font-bold sm:table-cell">
                          {currencyFormat(account.initial_balance)}
                        </TableCell>
                        <TableCell
                          className={cn(
                            'text-right font-bold',
                            account.balance >= 0
                              ? 'text-green-custom'
                              : 'text-[#C94736]',
                          )}
                        >
                          <div className="flex flex-col">
                            <span>{currencyFormat(account.balance)}</span>
                            <span className="text-xs font-medium text-muted-foreground sm:hidden">
                              {account.currency}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="flex items-center gap-2">
                          {account.can.update || account.can.delete ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <DotsThreeIcon weight="regular" size={18} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                {account.can.delete && (
                                  <DropdownMenuItem asChild>
                                    <DeleteAccount account={account} />
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                {account.can.update && (
                                  <DropdownMenuItem asChild>
                                    <AccountForm
                                      mode="edit"
                                      currencies={currencies}
                                      accountTypes={accountTypes}
                                      defaultValue={account}
                                    />
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
                <TablePagination links={accounts.links} className={'mt-6'} />
              </>
            )}
          </div>
        </div>
      </AppSettingsLayout>
    </AppLayout>
  );
}
