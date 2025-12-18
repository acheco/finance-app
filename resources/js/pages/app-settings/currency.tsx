import CurrencyForm from '@/components/currency-form';
import DeleteCurrency from '@/components/delete-currency';
import HeadingSmall from '@/components/heading-small';
import SearchFilter from '@/components/search-filter';
import TablePagination from '@/components/table-pagination';
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
import { index as currency } from '@/routes/currencies';
import { PaginatedCurrencies } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface CurrencyPageProps {
  currencies: PaginatedCurrencies;
  filters: {
    search: string;
  };
}

export default function Currency({ currencies, filters }: CurrencyPageProps) {
  const { errors } = usePage().props;

  console.log(errors);
  return (
    <AppLayout title="App Settings">
      <Head title="Currency settings" />

      <AppSettingsLayout>
        <HeadingSmall
          title="Currency settings"
          description="Here you can see general and personal currencies"
        />

        <div className="space-y-4">
          <div className="flex w-full items-center justify-between gap-4">
            <SearchFilter
              initialValue={filters.search}
              url={currency().url}
              placeholder="Search Currency"
              onlyProps={['currencies', 'filters']}
            />

            <CurrencyForm mode="create" />
          </div>
          <div className="rounded-md bg-white p-8 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Code</TableHead>
                  <TableHead className="hidden md:table-cell">Symbol</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currencies.data.map((currency) => (
                  <TableRow key={currency.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-custom md:hidden">
                          <span className="text-xs text-white">
                            {currency.symbol}
                          </span>
                        </div>
                        {currency.name}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {currency.code}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {currency.symbol}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      {currency.can.delete && (
                        <DeleteCurrency currency={currency} />
                      )}
                      {currency.can.update && (
                        <CurrencyForm mode="edit" defaultValue={currency} />
                      )}
                      {!currency.can.update && !currency.can.delete && (
                        <span>-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination links={currencies.links} className={'mt-6'} />
          </div>
        </div>
      </AppSettingsLayout>
    </AppLayout>
  );
}
