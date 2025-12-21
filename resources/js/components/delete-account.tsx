import AccountController from '@/actions/App/Http/Controllers/AppSettings/AccountController';
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
import { Account } from '@/types';
import { Form } from '@inertiajs/react';
import { TrashIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface DeleteAccountProps {
  account: Account;
}
export default function DeleteAccount({ account }: DeleteAccountProps) {
  const [open, setOpen] = useState(false);
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
        <DialogHeader>
          <DialogTitle>Delete {account.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this account? This action cannot be
            reversed, and all the data associated with it will be removed
            forever.
          </DialogDescription>
        </DialogHeader>

        <Form
          {...AccountController.destroy.form(account.id)}
          options={{
            preserveScroll: true,
          }}
          onSuccess={() => setOpen(false)}
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
                    Delete Account
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
