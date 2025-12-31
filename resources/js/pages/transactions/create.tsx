import {
  default as TransactionController,
  default as transactionController
} from '@/actions/App/Http/Controllers/TransactionController';
import { CalendarField } from '@/components/calendar-field';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { TransactionFormProps } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateTransaction({
  mode,
  transactionTypes,
  categories,
  suppliers,
  accounts,
  defaultValue,
}: TransactionFormProps) {
  const [supplierWithCategory, setSupplierWithCategory] = useState<
    typeof suppliers
  >([]);
  const [transactionType, setTransactionType] = useState(
    defaultValue?.transaction_type_id || 1,
  );

  const filteredCategories = categories.filter(
    (category) => category.transaction_type_id === transactionType,
  );

  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Add Transaction';

  const handleCategoryChange = (categoryId: number) => {
    const filtered = suppliers.filter(
      (supplier) => supplier.category_id === categoryId,
    );
    setSupplierWithCategory(filtered);
  };

  const handleTransactionTypeChange = (transactionTypeId: number) => {
    setTransactionType(transactionTypeId);
  };

  return (
    <AppLayout title="Create Transaction">
      <Head title="Create Transaction" />
      <section className="m-4 rounded-md bg-white p-6 shadow-sm sm:items-center lg:max-w-2xl">
        <Form
          {...(mode === 'edit'
            ? { ...TransactionController.update.form(defaultValue.id) }
            : { ...TransactionController.store.form() })}
          className="space-y-6"
        >
          {({ processing, errors, resetAndClearErrors }) => (
            <FieldSet>
              <FieldLegend className="font-bold">
                Register new transaction
              </FieldLegend>
              <FieldDescription>
                Register your transactions to track your finance.
              </FieldDescription>

              <ToggleGroup
                type="single"
                variant="outline"
                defaultValue={
                  defaultValue?.transaction_type_id.toString() || '1'
                }
                aria-label="Button Group"
              >
                {transactionTypes.map((type) => (
                  <ToggleGroupItem
                    key={type.id}
                    name="transaction_type_id"
                    value={type.id.toString()}
                    onClick={() => handleTransactionTypeChange(type.id)}
                    className={cn(
                      type.id === transactionType && 'cursor-not-allowed',
                    )}
                  >
                    {type.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <Field>
                <FieldLabel htmlFor="account">Account</FieldLabel>
                <Select name="account_id">
                  <SelectTrigger id="account" className="min-h-11">
                    <SelectValue
                      defaultValue={defaultValue?.account_id}
                      placeholder="Select account"
                    />
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
              </Field>
              <Field>
                <FieldLabel htmlFor="amount">Amount</FieldLabel>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min={0.0}
                  defaultValue={defaultValue?.amount}
                  className="min-h-11"
                  placeholder="$0.00"
                />
                <FieldError>{errors.amount}</FieldError>
              </Field>

              {/*<Field>*/}
              {/*  <FieldLabel htmlFor="type">Type</FieldLabel>*/}
              {/*  <RadioGroup*/}
              {/*    id="type"*/}
              {/*    name="transaction_type_id"*/}
              {/*    defaultValue={defaultValue ? defaultValue.id.toString() : '1'}*/}
              {/*    onValueChange={(value) =>*/}
              {/*      handleTransactionTypeChange(Number(value))*/}
              {/*    }*/}
              {/*    className="flex items-center justify-start"*/}
              {/*  >*/}
              {/*    {transactionTypes.map((type, index) => (*/}
              {/*      <div key={index} className="flex items-center space-x-2">*/}
              {/*        <RadioGroupItem*/}
              {/*          value={type.id.toString()}*/}
              {/*          id={'type' + index}*/}
              {/*        />*/}
              {/*        <Label htmlFor={'type' + index}>{type.name}</Label>*/}
              {/*      </div>*/}
              {/*    ))}*/}
              {/*  </RadioGroup>*/}
              {/*</Field>*/}

              <Field>
                <FieldLabel htmlFor="categories">Category</FieldLabel>
                <Select
                  name="category_id"
                  onValueChange={(value) => handleCategoryChange(Number(value))}
                  disabled={filteredCategories.length === 0}
                >
                  <SelectTrigger id="categories" className="min-h-11">
                    <SelectValue
                      defaultValue={defaultValue?.category_id}
                      placeholder="Select a Category"
                    />
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
              </Field>

              <Field>
                <FieldLabel htmlFor="supplier">Supplier</FieldLabel>
                <Select
                  name="supplier_id"
                  disabled={supplierWithCategory.length === 0}
                >
                  <SelectTrigger id="supplier" className="min-h-11">
                    <SelectValue
                      defaultValue={defaultValue?.supplier_id}
                      placeholder="Select a supplier"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {supplierWithCategory.map((supplier, index) => (
                      <SelectItem
                        key={index + supplier.name + supplier.id}
                        value={supplier.id.toString()}
                      >
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="date">Transaction Date</FieldLabel>
                <CalendarField
                  name="transaction_date"
                  defaultValue={defaultValue?.transaction_date}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="note">Note</FieldLabel>
                <Textarea id="note" placeholder="Optional note" />
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
                    {submitLabel}
                  </Button>
                }
                <Link href={transactionController.index()}>
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
          )}
        </Form>
      </section>
    </AppLayout>
  );
}
