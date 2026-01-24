import BudgetController from '@/actions/App/Http/Controllers/BudgetController';
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
import { Budget } from '@/types';
import { Form } from '@inertiajs/react';
import { useState } from 'react';

type DeleteBudgetFormProps = {
  budget: Budget;
};

export default function DeleteBudgetForm({ budget }: DeleteBudgetFormProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full justify-start" asChild>
        <Button variant="ghost" className="text-red-500 hover:text-red-600">
          Delete Budget
        </Button>
      </DialogTrigger>

      <DialogContent aria-label="Delete Budget" className="space-y-4">
        <DialogHeader>
          <DialogTitle>Delete "{budget.category.name}"</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this budget? This action cannot be
            reversed, and all the data associated with it will be removed
            forever.
          </DialogDescription>
        </DialogHeader>
        <Form
          {...BudgetController.destroy.form(budget.id)}
          options={{ preserveScroll: true }}
        >
          {({ resetAndClearErrors, processing }) => (
            <DialogFooter className="grid grid-cols-1 grid-rows-2">
              <Button
                variant="destructive"
                size="xl"
                disabled={processing}
                className="hover:bg-red-400"
              >
                Yes, Confirm Deletion
              </Button>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={() => resetAndClearErrors()}
                >
                  No, I want to go back
                </Button>
              </DialogClose>
            </DialogFooter>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
