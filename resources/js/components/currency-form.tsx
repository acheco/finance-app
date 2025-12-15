import CurrencyController from '@/actions/App/Http/Controllers/AppSettings/CurrencyController';
import InputError from '@/components/input-error';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Currency } from '@/types';
import { Form } from '@inertiajs/react';
import { PencilSimpleLineIcon } from '@phosphor-icons/react';

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
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Add Currency';

  return (
    <Dialog>
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
          className="space-y-6"
        >
          {({ processing, errors, resetAndClearErrors }) => (
            <>
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="text-xs font-bold text-grey-500"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={defaultValue?.name}
                  placeholder="US Dollar"
                  className="min-h-[45px]"
                />
                <InputError message={errors.name} />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="code"
                  className="text-xs font-bold text-grey-500"
                >
                  Code
                </Label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  defaultValue={defaultValue?.code}
                  placeholder="USD"
                  className="min-h-[45px]"
                />
                <InputError message={errors.code} />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="symbol"
                  className="text-xs font-bold text-grey-500"
                >
                  Symbol
                </Label>
                <Input
                  id="symbol"
                  name="symbol"
                  type="text"
                  defaultValue={defaultValue?.symbol}
                  placeholder="$"
                  className="min-h-[45px]"
                />
                <InputError message={errors.symbol} />
              </div>

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
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
