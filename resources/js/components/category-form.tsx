import CategoryController from '@/actions/App/Http/Controllers/AppSettings/CategoryController';
import IconPicker from '@/components/icon-picker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Category } from '@/types';
import { Form } from '@inertiajs/react';
import { PencilSimpleLineIcon } from '@phosphor-icons/react';
import { useState } from 'react';

type CategoryFormProps = {
  colors: { value: string; label: string }[];
} & (
  | {
      mode: 'create';
      defaultValue?: never;
    }
  | {
      mode: 'edit';
      defaultValue: Category;
    }
);

export default function CategoryForm({
  colors,
  mode,
  defaultValue,
}: CategoryFormProps) {
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(defaultValue?.icon || '');
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Add Category';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'edit' ? (
          <Button variant="ghost" size="icon-sm">
            <PencilSimpleLineIcon weight="fill" color="#826CB0" />
          </Button>
        ) : (
          <Button>+ New Category</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-[32px] font-bold">
          {mode === 'edit'
            ? `Editing ${defaultValue?.name}`
            : 'Add New Category'}
        </DialogTitle>
        <DialogDescription>
          {mode === 'edit'
            ? 'Edit your category as your need, please note this will affect your transactions and budgets.'
            : 'Create new categories as you need.'}
        </DialogDescription>

        <Form
          {...(mode === 'edit'
            ? { ...CategoryController.update.form(defaultValue.id) }
            : { ...CategoryController.store.form() })}
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
                  placeholder="Groceries"
                  className="min-h-11"
                />
                <FieldError>{errors.name}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="type">Type</FieldLabel>
                <Select
                  name="transaction_type_id"
                  defaultValue={defaultValue?.transaction_type_id.toString()}
                >
                  <SelectTrigger className="min-h-11">
                    <SelectValue
                      placeholder="Select the type"
                      defaultValue={defaultValue?.transaction_type_id}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Expense</SelectItem>
                    <SelectItem value="2">Income</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError>{errors.transaction_type_id}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="color">Color</FieldLabel>
                <Select name="color" defaultValue={defaultValue?.color}>
                  <SelectTrigger className="min-h-11">
                    <SelectValue placeholder="Pick a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color, index) => (
                      <SelectItem key={index} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: color.value }}
                          />
                          <p>{color.label}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.color}</FieldError>
              </Field>
              <Field data-invalid={errors.icon}>
                <FieldLabel>Icon</FieldLabel>
                <IconPicker
                  value={selectedIcon}
                  onChange={setSelectedIcon}
                  weight="fill"
                  name="icon"
                />
                <FieldError>{errors.icon}</FieldError>
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
