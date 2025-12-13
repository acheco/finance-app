import HeadingSmall from '@/components/heading-small';
import TablePagination from '@/components/table-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { PaginatedCurrencies } from '@/types';
import { Head } from '@inertiajs/react';

interface CurrencyPageProps {
  currencies: PaginatedCurrencies;
}

export default function currency({ currencies }: CurrencyPageProps) {
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
            <Input
              type="text"
              name="filter"
              placeholder="Filter"
              className="max-w-3xs border-gray-200 bg-white"
            />
            <Button>New Currency</Button>
          </div>
          <div className="rounded-md bg-white p-8 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currencies.data.map((currency) => (
                  <TableRow key={currency.id}>
                    <TableCell>{currency.name}</TableCell>
                    <TableCell>{currency.symbol}</TableCell>
                    <TableCell>actions goes here</TableCell>
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
