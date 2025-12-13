import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import AppSettingsLayout from '@/layouts/settings/app-settings-layout';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';

export default function account() {
  return (
    <AppLayout title="App Settings">
      <Head title="Account settings" />

      <AppSettingsLayout>
        <HeadingSmall
          title="Accounts information"
          description="Manage your finance account information"
        />

        <div className="space-y-4">
          <div className="flex w-full items-center justify-between gap-4">
            <Input
              type="text"
              name="filter"
              placeholder="Filter"
              className="max-w-3xs border-gray-200 bg-white"
            />
            <Button>New Account</Button>
          </div>

          <Table className="w-full rounded-md bg-white">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className={cn()}>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </AppSettingsLayout>
    </AppLayout>
  );
}
