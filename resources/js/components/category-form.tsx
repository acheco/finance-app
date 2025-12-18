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
import { Category } from '@/types';
import { Form } from '@inertiajs/react';
import { PencilSimpleLineIcon } from '@phosphor-icons/react';
import { useState } from 'react';

const colors = [
  { key: '#277C78', name: 'Green' },
  { key: '#F2CDAC', name: 'Yellow' },
  { key: '#82C9D7', name: 'Cyan' },
  { key: '#626070', name: 'Navy' },
  { key: '#C94736', name: 'Red' },
  { key: '#826CB0', name: 'Purple' },
  { key: '#AF81BA', name: 'Light Pink' },
  { key: '#F2994A', name: 'Orange' },
  { key: '#597C7C', name: 'Turquoise' },
  { key: '#93674F', name: 'Brown' },
  { key: '#934F6F', name: 'Magenta' },
  { key: '#7F9161', name: 'Army Green' },
  { key: '#CAB361', name: 'Goldenrod' },
  { key: '#F2C94C', name: 'Khaki' },
  { key: '#619393', name: 'Teal' },
  { key: '#936F93', name: 'Violet' },
  { key: '#939361', name: 'Olive Green' },
  { key: '#936193', name: 'Light Purple' },
  { key: '#C99361', name: 'Sandy Brown' },
  { key: '#6193C9', name: 'Light Blue' },
  { key: '#93C961', name: 'Lime Green' },
  { key: '#C96193', name: 'Pink' },
  { key: '#93C993', name: 'Sea Green' },
  { key: '#C9C961', name: 'Yellow Green' },
  { key: '#C961C9', name: 'Magenta Pink' },
  { key: '#61C9C9', name: 'Turquoise Blue' },
  { key: '#C9C993', name: 'Beige' },
  { key: '#C9C9C9', name: 'Silver' },
  { key: '#616161', name: 'Gray' },
  { key: '#E63946', name: 'Crimson' },
  { key: '#457B9D', name: 'Steel Blue' },
  { key: '#A8DADC', name: 'Powder Blue' },
  { key: '#F4A261', name: 'Sandy Orange' },
  { key: '#E76F51', name: 'Burnt Sienna' },
  { key: '#2A9D8F', name: 'Persian Green' },
  { key: '#E9C46A', name: 'Saffron' },
  { key: '#264653', name: 'Charcoal' },
  { key: '#8B5A3C', name: 'Copper' },
  { key: '#6A4C93', name: 'Royal Purple' },
  { key: '#FF6B6B', name: 'Coral' },
  { key: '#4ECDC4', name: 'Aquamarine' },
  { key: '#FFE66D', name: 'Mustard' },
  { key: '#95E1D3', name: 'Mint' },
  { key: '#F38181', name: 'Light Coral' },
  { key: '#AA96DA', name: 'Lavender' },
  { key: '#FCBAD3', name: 'Bubblegum' },
  { key: '#A8E6CF', name: 'Seafoam' },
  { key: '#FFD3B6', name: 'Peach' },
  { key: '#FFAAA5', name: 'Salmon' },
  { key: '#FF8B94', name: 'Rose' },
];

type CategoryFormProps =
  | {
      mode: 'create';
      defaultValue?: never;
    }
  | {
      mode: 'edit';
      defaultValue: Category;
    };

export default function CategoryForm({
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
                      <SelectItem key={index} value={color.key}>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: color.key }}
                          />
                          <p>{color.name}</p>
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
