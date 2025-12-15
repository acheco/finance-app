import CurrencyController from '@/actions/App/Http/Controllers/AppSettings/CurrencyController';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Currency } from '@/types';
import { Form } from '@inertiajs/react';
import { TrashIcon } from '@phosphor-icons/react';

interface DeleteCurrencyProps {
  currency: Currency;
}
export default function DeleteCurrency({ currency }: DeleteCurrencyProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <TrashIcon weight="fill" color="#C94736" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {currency.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this currency? This action cannot be
            reversed, and all the data associated with it wil be removed
            forever.
          </DialogDescription>
        </DialogHeader>

        <Form
          {...CurrencyController.destroy.form(currency.id)}
          options={{
            preserveScroll: true,
          }}
          resetOnSuccess
        >
          {({ resetAndClearErrors, processing }) => (
            <>
              <div className="grid gap-2">
                <DialogFooter className="flex flex-col flex-wrap">
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      onClick={() => resetAndClearErrors()}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={processing}
                    variant="destructive"
                  >
                    Delete Currency
                  </Button>
                </DialogFooter>
              </div>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
