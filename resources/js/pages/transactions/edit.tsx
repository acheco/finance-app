import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import TransactionForm from '@/components/transaction-form';
import AppLayout from '@/layouts/app-layout';
import { Transaction } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
  transaction: Transaction;
  suppliers: { id: number; name: string; category_id: number }[];
  categories: { id: number; name: string; transaction_type_id: number }[];
  accounts: { id: number; name: string; balance: number }[];
  transactionTypes: { id: number; name: string }[];
}
export default function Edit({
  transaction,
  suppliers,
  categories,
  accounts,
  transactionTypes,
}: Props) {
  return (
    <AppLayout
      title="Transactions"
      withReturnButton={true}
      backUrl={TransactionController.index().url}
    >
      <Head title="Edit Transaction" />

      <section className="m-4 rounded-md bg-white p-6 shadow-sm sm:items-center lg:max-w-2xl">
        <TransactionForm
          mode="edit"
          defaultValues={transaction}
          suppliers={suppliers}
          categories={categories}
          accounts={accounts}
          transactionTypes={transactionTypes}
        />
      </section>
    </AppLayout>
  );
}
