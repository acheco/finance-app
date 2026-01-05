import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
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
import AppLayout from '@/layouts/app-layout';
import { cn, currencyFormat } from '@/lib/utils';
import { CreateTransactionFormProps } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export default function CreateTransaction({
  transactionTypes,
  categories,
  suppliers,
  accounts,
}: CreateTransactionFormProps) {
  const [transactionType, setTransactionType] = useState<number>(1);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  function handleTransactionTypeChange(transactionTypeId: number) {
    setTransactionType(transactionTypeId);
    setSelectedCategory('');
  }

  const filteredCategories = categories.filter(
    (category) => category.transaction_type_id === transactionType,
  );

  const supplierWithCategory = selectedCategory
    ? suppliers.filter(
        (supplier) => supplier.category_id === Number(selectedCategory),
      )
    : [];

  const account = selectedAccount
    ? accounts.find((account) => account.id === Number(selectedAccount))
    : undefined;

  function resetFormInputs() {
    setSelectedAccount('');
    setSelectedCategory('');
    setCurrentDate(new Date().toISOString().split('T')[0]);
  }

  return (
    <AppLayout
      title="Transactions"
      withReturnButton={true}
      backUrl={TransactionController.index().url}
    >
      <Head title="Add Transaction" />

      <section className="m-4 rounded-md bg-white p-6 shadow-sm sm:items-center lg:max-w-2xl">
        <Form
          {...TransactionController.store.form()}
          onSuccess={() => resetFormInputs()}
          resetOnSuccess
          className="space-y-6"
        >
          {({ processing, errors, resetAndClearErrors }) => (
            <FieldGroup>
              <FieldSet>
                <FieldLegend className="font-bold">Add transaction</FieldLegend>
                <FieldDescription>
                  Enter the details of your transaction to keep track of your
                  spending and income
                </FieldDescription>

                <Field>
                  <input
                    type="hidden"
                    name="transaction_type_id"
                    value={transactionType}
                  />
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    defaultValue={transactionType.toString()}
                    aria-label="Button Group"
                    className="max-w-fit"
                  >
                    {transactionTypes.map((type) => (
                      <ToggleGroupItem
                        key={type.id}
                        name="transaction_type_id"
                        value={type.id.toString()}
                        onClick={() => handleTransactionTypeChange(type.id)}
                        disabled={type.id === transactionType}
                      >
                        {type.name}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </Field>

                <div className="flex items-center gap-2">
                  <Field>
                    <FieldLabel htmlFor="account">
                      {transactionType === 3 ? (
                        <>
                          From Account
                          <ArrowRightIcon weight="fill" size={16} />
                        </>
                      ) : (
                        'Account'
                      )}
                    </FieldLabel>
                    <Select
                      name="account_id"
                      required
                      value={selectedAccount || ''}
                      onValueChange={setSelectedAccount}
                    >
                      <SelectTrigger id="account" className="min-h-11">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem
                            key={account.id}
                            value={account.id.toString()}
                          >
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError>{errors.account_id}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Balance</FieldLabel>
                    <Label
                      className={cn(
                        'flex min-h-11 items-center rounded-md border px-2 text-muted-foreground',
                        account?.balance.toString().at(0) === '-' &&
                          'text-red-400',
                      )}
                    >
                      {account?.balance
                        ? currencyFormat(account.balance)
                        : '$0.00'}
                    </Label>
                  </Field>
                </div>

                {transactionType === 3 && (
                  <Field>
                    <FieldLabel htmlFor="account">
                      To Account
                      <ArrowLeftIcon weight="fill" size={16} />
                    </FieldLabel>
                    <Select name="to_account">
                      <SelectTrigger id="account" className="min-h-11">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem
                            key={account.id}
                            value={account.id.toString()}
                          >
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError>{errors.account_id}</FieldError>
                  </Field>
                )}

                <Field>
                  <FieldLabel htmlFor="amount">Amount</FieldLabel>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min={0.0}
                    className="min-h-11"
                    placeholder="$0.00"
                    required
                  />
                  <FieldError>{errors.amount}</FieldError>
                </Field>

                {transactionType !== 3 && (
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="categories">Category</FieldLabel>
                      <Select
                        name="category_id"
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                        disabled={filteredCategories.length === 0}
                      >
                        <SelectTrigger id="categories" className="min-h-11">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError>{errors.category_id}</FieldError>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="supplier">Supplier</FieldLabel>
                      <Select
                        name="supplier_id"
                        disabled={supplierWithCategory.length === 0}
                      >
                        <SelectTrigger id="supplier" className="min-h-11">
                          <SelectValue placeholder="Select the supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {supplierWithCategory.map((supplier) => (
                            <SelectItem
                              key={supplier.id}
                              value={supplier.id.toString()}
                            >
                              {supplier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <FieldError>{errors.supplier_id}</FieldError>
                  </FieldGroup>
                )}

                <Field>
                  <FieldLabel htmlFor="date">Transaction Date</FieldLabel>
                  <input
                    id="date"
                    type="date"
                    name="transaction_date"
                    value={currentDate.toString()}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="min-h-11 rounded-md border px-2"
                  />
                  <FieldError>{errors.transaction_date}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="note">Note</FieldLabel>
                  <Textarea
                    id="note"
                    name="notes"
                    placeholder="Optional note"
                  />
                  <FieldError>{errors.notes}</FieldError>
                </Field>

                <div className="flex flex-col flex-wrap gap-2">
                  {
                    <Button
                      type="submit"
                      size="xl"
                      disabled={processing}
                      className="w-full"
                    >
                      {processing && <Spinner />}
                      Add New Transaction
                    </Button>
                  }
                  <Link href={TransactionController.index()}>
                    <Button
                      variant="secondary"
                      size="xl"
                      onClick={() => resetAndClearErrors()}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </FieldSet>
            </FieldGroup>
          )}
        </Form>
      </section>
    </AppLayout>
  );
}
