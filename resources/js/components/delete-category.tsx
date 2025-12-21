import CategoryController from '@/actions/App/Http/Controllers/AppSettings/CategoryController';
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
import { Category } from '@/types';
import { Form } from '@inertiajs/react';
import { TrashIcon } from '@phosphor-icons/react';

interface DeleteCategoryProps {
  category: Category;
}
export default function DeleteCategory({ category }: DeleteCategoryProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <TrashIcon weight="fill" color="#C94736" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {category.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category? This action cannot be
            reversed, and all the data associated with it will be removed
            forever.
          </DialogDescription>
        </DialogHeader>

        <Form
          {...CategoryController.destroy.form(category.id)}
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
                    Delete Category
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
