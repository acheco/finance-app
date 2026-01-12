import AccountController from '@/actions/App/Http/Controllers/AppSettings/AccountController';
import Icon from '@/components/icon';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Account, AccountType } from '@/types';
import { Form } from '@inertiajs/react';
import { PencilSimpleLineIcon } from '@phosphor-icons/react';
import { useState } from 'react';

type AccountFormProps = {
  currencies: { id: number; name: string; symbol: string }[];
  accountTypes: AccountType[];
} & (
  | { mode: 'create'; defaultValue?: never }
  | { mode: 'edit'; defaultValue: Account }
);

export default function AccountForm({
  currencies,
  accountTypes,
  defaultValue,
  mode,
}: AccountFormProps) {
  const [open, setOpen] = useState(false);
  const isEdit = mode === 'edit';
  const submitLabel = isEdit ? 'Save Changes' : 'Add Account';
  const [accountColor, setAccountColor] = useState(defaultValue?.color ?? '');
  const [accountIcon, setAccountIcon] = useState(defaultValue?.icon ?? '');

  const formProps = isEdit
    ? AccountController.update.form(defaultValue.id)
    : AccountController.store.form();

  function handleTypeChange(value: string) {
    const selectedType = accountTypes.find((type) => type.value === value);
    if (selectedType) {
      setAccountColor(selectedType.color);
      setAccountIcon(selectedType.icon);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" className="w-full justify-start">
            <PencilSimpleLineIcon weight="fill" color="#826CB0" />
            Edit
          </Button>
        ) : (
          <Button>+ New Account</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-[32px] font-bold">
          {isEdit ? `Editing ${defaultValue.name}` : 'Add New Account'}
        </DialogTitle>
        <DialogDescription>
          {isEdit
            ? 'Edit your account as your need, please note this will affect your transactions and budgets.'
            : 'Create new account as you need.'}
        </DialogDescription>

        <Form
          {...formProps}
          onSuccess={() => {
            setOpen(false);
          }}
          className="space-y-6"
        >
          {({ processing, errors, resetAndClearErrors }) => (
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={defaultValue?.name}
                  placeholder="Payroll Account"
                />
                <FieldError>{errors.name}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="type">Type</FieldLabel>
                <input type="hidden" name="color" value={accountColor} />
                <input type="hidden" name="icon" value={accountIcon} />
                <Select
                  name="account_type"
                  onValueChange={handleTypeChange}
                  defaultValue={defaultValue?.account_type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Checking" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((accountType, index) => (
                      <SelectItem key={index} value={accountType.value}>
                        <Icon
                          name={accountType.icon}
                          color={accountType.color}
                        />
                        {accountType.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.account_type}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="currency">Currency</FieldLabel>
                <Select
                  name="currency_id"
                  defaultValue={defaultValue?.currency_id.toString()}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="US Dollar" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency, index) => (
                      <SelectItem
                        key={index}
                        value={currency.id.toString()}
                        className="space-x-2"
                      >
                        <span>{currency.symbol}</span>
                        <span>{currency.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.type}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="initial_balance">
                  Initial Balance
                </FieldLabel>
                <Input
                  id="initial_balance"
                  name="initial_balance"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue={defaultValue?.initial_balance}
                />
                <FieldError>{errors.initial_balance}</FieldError>
              </Field>

              <DialogFooter className="flex flex-col flex-wrap">
                <Button
                  type="submit"
                  size="xl"
                  disabled={processing}
                  className="w-full"
                >
                  {processing && <Spinner />}
                  {submitLabel}
                </Button>

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
