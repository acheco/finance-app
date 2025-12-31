import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import { CalendarField } from '@/components/calendar-field';
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
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { Transaction } from '@/types';
import { Form, router } from '@inertiajs/react';
import { PencilSimpleLineIcon } from '@phosphor-icons/react';
import { useState } from 'react';

type TransactionFormProps = {
  suppliers: { id: number; name: string; category_id: number }[];
  transactionTypes: { id: number; name: string }[];
  accounts: { id: number; name: string }[];
  categories: { id: number; name: string; transaction_type_id: number }[];
} & (
  | { mode: 'create'; defaultValue?: never }
  | { mode: 'edit'; defaultValue: Transaction }
);

export default function TransactionForm({
  suppliers,
  transactionTypes,
  accounts,
  categories,
  mode,
  defaultValue,
}: TransactionFormProps) {
  const [openModal, setOpenModal] = useState(false);
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

  if (!suppliers || !accounts) {
    router.reload({
      only: ['suppliers', 'accounts'],
    });
  }

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
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        {mode === 'edit' ? (
          <Button variant="ghost" size="icon-sm">
            <PencilSimpleLineIcon weight="fill" color="#826CB0" />
          </Button>
        ) : (
          <Button>+</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-[32px] font-bold">
          {mode === 'edit'
            ? `Editing ${defaultValue?.category}`
            : 'Add Transaction'}
        </DialogTitle>
        <DialogDescription>
          {mode === 'edit'
            ? 'Editing this transaction .'
            : 'Register a new Transaction'}
        </DialogDescription>
        <Form {...TransactionController.store.form()} className="space-y-6">
          {({ processing, errors, resetAndClearErrors }) => (
            <FieldSet>
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

              <Field>
                <FieldLabel>Type</FieldLabel>
                <RadioGroup
                  name="transaction_type_id"
                  defaultValue={defaultValue ? defaultValue.id.toString() : '1'}
                  onValueChange={(value) =>
                    handleTransactionTypeChange(Number(value))
                  }
                  className="flex items-center justify-start"
                >
                  {transactionTypes.map((type, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={type.id.toString()}
                        id={'type' + index}
                      />
                      <Label htmlFor={'type' + index}>{type.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </Field>

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

              <DialogFooter className="flex flex-col flex-wrap">
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
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    size="xl"
                    onClick={() => resetAndClearErrors()}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </FieldSet>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
