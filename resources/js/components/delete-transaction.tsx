import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { currencyFormat } from '@/lib/utils';
import { Transaction } from '@/types';
import { Form } from '@inertiajs/react';
import { TrashIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface Props {
  transaction: Transaction;
}
export default function DeleteTransaction({ transaction }: Props) {
  const [open, setOpen] = useState(false);
  const transactionBalance = currencyFormat(transaction.amount);
  const transactionDate = new Date(transaction.transaction_date);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-red-100 dark:hover:bg-red-600"
        >
          <TrashIcon weight="fill" color="#C94736" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Delete transaction made to {transaction.supplier} for{' '}
          {transactionBalance} on {transactionDate.toLocaleDateString()}
        </DialogTitle>
        <DialogDescription>
          This action cannot be reversed, this will affect your account and
          budgets balance.
        </DialogDescription>
        <Form
          {...TransactionController.destroy.form(transaction.id)}
          options={{ preserveScroll: true }}
          onSuccess={() => setOpen(false)}
          resetOnSuccess
        >
          {({ resetAndClearErrors, processing }) => (
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  onClick={() => resetAndClearErrors()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="destructive" disabled={processing}>
                Delete Transaction
              </Button>
            </DialogFooter>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
