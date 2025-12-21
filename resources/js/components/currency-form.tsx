import CurrencyController from '@/actions/App/Http/Controllers/AppSettings/CurrencyController';
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
import { Spinner } from '@/components/ui/spinner';
import { Currency } from '@/types';
import { Form } from '@inertiajs/react';
import { PencilSimpleLineIcon } from '@phosphor-icons/react';
import { useState } from 'react';

type CurrencyFormProps =
  | {
      mode: 'create';
      defaultValue?: never;
    }
  | {
      mode: 'edit';
      defaultValue: Currency;
    };

export default function CurrencyForm({
  mode,
  defaultValue,
}: CurrencyFormProps) {
  const [open, setOpen] = useState(false);
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Add Currency';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'edit' ? (
          <Button variant="ghost" size="icon-sm">
            <PencilSimpleLineIcon weight="fill" color="#826CB0" />
          </Button>
        ) : (
          <Button>+ New Currency</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-[32px] font-bold">
          {mode === 'edit'
            ? `Editing ${defaultValue?.name}`
            : 'Add New Currency'}
        </DialogTitle>
        <DialogDescription>
          {mode === 'edit'
            ? 'Edit your currency as your need, please note this will affect your transactions.'
            : 'Create new currencies to use then in the app.'}
        </DialogDescription>

        <Form
          {...(mode === 'edit'
            ? { ...CurrencyController.update.form(defaultValue.id) }
            : { ...CurrencyController.store.form() })}
          onSuccess={() => setOpen(false)}
          className="space-y-6"
        >
          {({ processing, errors, resetAndClearErrors }) => (
            <FieldSet>
              <Field data-invalid={errors.name}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  defaultValue={defaultValue?.name}
                  placeholder="US Dollar"
                  className="min-h-11"
                />
                <FieldError>{errors.name}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="code">Code</FieldLabel>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  defaultValue={defaultValue?.code}
                  placeholder="USD"
                  className="min-h-11"
                />
                <FieldError>{errors.code}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="symbol">Symbol</FieldLabel>
                <Input
                  id="symbol"
                  name="symbol"
                  type="text"
                  defaultValue={defaultValue?.symbol}
                  placeholder="$"
                  className="min-h-11"
                />
                <FieldError>{errors.symbol}</FieldError>
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
