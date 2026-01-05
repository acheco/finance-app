import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import TransactionForm from '@/components/transaction-form';
import AppLayout from '@/layouts/app-layout';
import { CreateTransactionFormProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function CreateTransaction({
  transactionTypes,
  categories,
  suppliers,
  accounts,
}: CreateTransactionFormProps) {
  return (
    <AppLayout
      title="Transactions"
      withReturnButton={true}
      backUrl={TransactionController.index().url}
    >
      <Head title="Add Transaction" />

      <section className="m-4 rounded-md bg-white p-6 shadow-sm sm:items-center lg:max-w-2xl">
        <TransactionForm
          mode="create"
          transactionTypes={transactionTypes}
          accounts={accounts}
          categories={categories}
          suppliers={suppliers}
        />
      </section>
    </AppLayout>
  );
}
