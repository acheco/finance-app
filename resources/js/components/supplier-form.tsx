import SupplierController from '@/actions/App/Http/Controllers/AppSettings/SupplierController';
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
import { Textarea } from '@/components/ui/textarea';
import { CategoryOption, Supplier } from '@/types';
import { Form } from '@inertiajs/react';
import { PencilSimpleLineIcon } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';

type SupplierFormProps = {
  categories: CategoryOption[];
} & (
  | { mode: 'create'; defaultValue?: never }
  | { mode: 'edit'; defaultValue: Supplier }
);

const API_KEY = import.meta.env.VITE_LOGO_API_KEY;

export default function SupplierForm(props: SupplierFormProps) {
  const { mode, categories, defaultValue } = props;
  const [open, setOpen] = useState(false);
  const [, setBrandName] = useState(defaultValue?.name || '');
  const [logoUrl, setLogoUrl] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const isEdit = mode === 'edit';
  const submitLabel = isEdit ? 'Save Changes' : 'Add Supplier';

  const formProps = isEdit
    ? SupplierController.update.form(props.defaultValue.id)
    : SupplierController.store.form();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBrandName(value);

    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (value.trim().length >= 2 && API_KEY) {
        const encodedName = encodeURIComponent(value.trim());
        setLogoUrl(`https://img.logo.dev/name/${encodedName}?token=${API_KEY}`);
      } else {
        setLogoUrl('');
      }
    }, 500);

    setTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setLogoUrl('');
    } else if (isOpen && isEdit && defaultValue?.logo) {
      setLogoUrl(defaultValue.logo);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" className="w-full justify-start">
            <PencilSimpleLineIcon weight="fill" color="#826CB0" />
            Edit
          </Button>
        ) : (
          <Button>+ New Supplier</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-[32px] font-bold">
          {isEdit ? `Editing ${defaultValue.name}` : 'Add New Supplier'}
        </DialogTitle>
        <DialogDescription>
          {isEdit
            ? 'Edit your supplier as your need, please note this will affect your transactions and budgets.'
            : 'Create new suppliers as you need.'}
        </DialogDescription>

        <Form
          {...formProps}
          onSuccess={() => {
            setOpen(false);
            setLogoUrl('');
          }}
          className="space-y-6"
        >
          {({ processing, errors, resetAndClearErrors }) => (
            <FieldSet>
              <input type="hidden" name="logo" value={logoUrl} />

              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <div className="flex items-center gap-3">
                  <Input
                    id="name"
                    name="name"
                    defaultValue={defaultValue?.name}
                    placeholder="Amazon"
                    className="min-h-11 flex-1"
                    onChange={handleNameChange}
                  />
                  <div className="flex h-11 w-12 items-center justify-center rounded border border-gray-200 bg-gray-50">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="h-10 w-10 object-contain"
                        onError={() => setLogoUrl('')}
                      />
                    ) : (
                      <Icon name="image" className="text-gray-400" size={20} />
                    )}
                  </div>
                </div>
                <FieldError>{errors.name}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select
                  name="category_id"
                  defaultValue={defaultValue?.category_id.toString()}
                >
                  <SelectTrigger className="min-h-11">
                    <SelectValue placeholder="Select the category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem
                        key={index}
                        value={category.id.toString()}
                        className="flex items-center justify-between text-grey-900"
                      >
                        <div className="flex items-center gap-2">
                          {category.icon && (
                            <Icon name={category.icon} weight="fill" />
                          )}
                          <span>{category.name}</span>
                        </div>
                        <span className="ml-auto text-xs">
                          ({category.suppliers_count})
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.category_id}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={defaultValue?.phone}
                  placeholder="123-123-1234"
                />
                <FieldError>{errors.phone}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={defaultValue?.email}
                  placeholder="email@example.com"
                />
                <FieldError>{errors.email}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="address">Address</FieldLabel>
                <Textarea name="address" placeholder="Type the address here." />
                <FieldError>{errors.address}</FieldError>
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
