import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn, currencyFormat } from '@/lib/utils';
import { index, store, update } from '@/routes/transactions';
import { TransactionFormProps } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import React from 'react';

type TransactionFormData = {
  transaction_type_id: number;
  account_id: string;
  to_account: string;
  amount: string | number;
  category_id: string;
  supplier_id: string;
  transaction_date: string;
  notes: string;
};

export default function TransactionForm({
  mode,
  defaultValues,
  accounts,
  categories,
  suppliers,
  transactionTypes,
}: TransactionFormProps) {
  const { data, setData, post, put, processing, errors, resetAndClearErrors } =
    useForm<TransactionFormData>({
      transaction_type_id: defaultValues?.transaction_type_id ?? 1,
      account_id: defaultValues?.account_id?.toString() ?? '',
      to_account: '',
      amount: defaultValues?.amount ?? '',
      category_id: defaultValues?.category_id?.toString() ?? '',
      supplier_id: defaultValues?.supplier_id?.toString() ?? '',
      transaction_date:
        (defaultValues?.transaction_date as string) ??
        new Date().toISOString().split('T')[0],
      notes: defaultValues?.notes ?? '',
    });

  const title = mode === 'edit' ? 'Edit Transaction' : 'Add New Transaction';
  const description =
    mode === 'edit'
      ? 'Feel free to update your transaction, Please note this will affect your budgets and reports.'
      : 'Enter the details of your transaction to keep track of your spending and income';

  const filteredCategories = categories.filter(
    (category) => category.transaction_type_id === data.transaction_type_id,
  );

  const supplierWithCategory = data.category_id
    ? suppliers.filter((s) => s.category_id === Number(data.category_id))
    : [];

  const account = data.account_id
    ? accounts.find((a) => a.id === Number(data.account_id))
    : undefined;

  function handleTransactionTypeChange(typeId: number) {
    setData((prev) => ({
      ...prev,
      transaction_type_id: typeId,
      category_id: '',
      supplier_id: '',
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === 'edit' && defaultValues?.id) {
      put(update(defaultValues.id).url);
    } else {
      post(store().url);
      resetAndClearErrors();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup>
        <FieldSet>
          <FieldLegend className="font-bold">{title}</FieldLegend>
          <FieldDescription>{description}</FieldDescription>

          {/* Transaction Type */}
          <Field>
            <ToggleGroup
              type="single"
              variant="outline"
              value={data.transaction_type_id.toString()}
              onValueChange={(val) =>
                val && handleTransactionTypeChange(Number(val))
              }
              className="max-w-fit"
            >
              {transactionTypes.map((type) => (
                <ToggleGroupItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <FieldError>{errors.transaction_type_id}</FieldError>
          </Field>

          <FieldGroup className="flex flex-col items-start gap-2">
            <div className="flex w-full flex-row items-center gap-2">
              <Field>
                <FieldLabel htmlFor="account">
                  {data.transaction_type_id === 3 ? (
                    <span className="flex items-center gap-1">
                      From Account <ArrowRightIcon weight="fill" />
                    </span>
                  ) : (
                    'Account'
                  )}
                </FieldLabel>
                <Select
                  value={data.account_id}
                  onValueChange={(val) => setData('account_id', val)}
                >
                  <SelectTrigger id="account" className="min-h-11">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((acc) => (
                      <SelectItem key={acc.id} value={acc.id.toString()}>
                        {acc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Balance</FieldLabel>
                <Label
                  className={cn(
                    'flex min-h-11 items-center rounded-md border px-2 text-muted-foreground',
                    account?.balance && account.balance < 0 && 'text-red-400',
                  )}
                >
                  {account?.balance ? currencyFormat(account.balance) : '$0.00'}
                </Label>
              </Field>
            </div>
            <FieldError>{errors.account_id}</FieldError>
          </FieldGroup>

          {/* To Account (Transfer only) */}
          {data.transaction_type_id === 3 && (
            <Field>
              <FieldLabel htmlFor="to_account">
                To Account <ArrowLeftIcon weight="fill" size={16} />
              </FieldLabel>
              <Select
                value={data.to_account}
                onValueChange={(val) => setData('to_account', val)}
              >
                <SelectTrigger id="to_account" className="min-h-11">
                  <SelectValue placeholder="Select destination account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem key={acc.id} value={acc.id.toString()}>
                      {acc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError>{errors.to_account}</FieldError>
            </Field>
          )}

          <Field>
            <FieldLabel htmlFor="amount">Amount</FieldLabel>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={data.amount}
              onChange={(e) => setData('amount', e.target.value)}
              className="min-h-11"
              placeholder="$0.00"
              required
            />
            <FieldError>{errors.amount}</FieldError>
          </Field>

          {data.transaction_type_id !== 3 && (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="categories">Category</FieldLabel>
                <Select
                  value={data.category_id}
                  onValueChange={(val) =>
                    setData((prev) => ({
                      ...prev,
                      category_id: val,
                      supplier_id: '',
                    }))
                  }
                  disabled={filteredCategories.length === 0}
                >
                  <SelectTrigger id="categories" className="min-h-11">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.category_id}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="supplier">Supplier</FieldLabel>
                <Select
                  value={data.supplier_id}
                  onValueChange={(val) => setData('supplier_id', val)}
                  disabled={supplierWithCategory.length === 0}
                >
                  <SelectTrigger id="supplier" className="min-h-11">
                    <SelectValue placeholder="Select the supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {supplierWithCategory.map((sup) => (
                      <SelectItem key={sup.id} value={sup.id.toString()}>
                        {sup.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.supplier_id}</FieldError>
              </Field>
            </FieldGroup>
          )}

          <Field>
            <FieldLabel htmlFor="date">Transaction Date</FieldLabel>
            <input
              id="date"
              type="date"
              value={data.transaction_date.toString()}
              onChange={(e) => setData('transaction_date', e.target.value)}
              className="min-h-11 rounded-md border border-input bg-background px-2"
            />
            <FieldError>{errors.transaction_date}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="note">Note</FieldLabel>
            <Textarea
              id="note"
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
              placeholder="Optional note"
            />
            <FieldError>{errors.notes}</FieldError>
          </Field>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              size="xl"
              disabled={processing}
              className="w-full"
            >
              {processing && <Spinner />}
              {mode === 'edit' ? 'Save changes' : 'Add New Transaction'}
            </Button>

            <Link href={index().url}>
              <Button
                variant="secondary"
                size="xl"
                type="button"
                onClick={() => {
                  resetAndClearErrors();
                }}
                className="w-full"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
