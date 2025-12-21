import SupplierController from '@/actions/App/Http/Controllers/AppSettings/SupplierController';
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
import { Supplier } from '@/types';
import { Form } from '@inertiajs/react';
import { TrashIcon } from '@phosphor-icons/react';

interface DeleteSupplierProps {
  supplier: Supplier;
}
export default function DeleteSupplier({ supplier }: DeleteSupplierProps) {
  return (
    <Dialog>
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
          <DialogTitle>Delete {supplier.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this supplier? This action cannot be
            reversed, and all the data associated with it will be removed
            forever.
          </DialogDescription>
        </DialogHeader>

        <Form
          {...SupplierController.destroy.form(supplier.id)}
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
                    Delete Supplier
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
