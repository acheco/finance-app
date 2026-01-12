import BudgetController from '@/actions/App/Http/Controllers/BudgetController';
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
import { BudgetFormProps } from '@/types';
import { Form } from '@inertiajs/react';
import { PencilSimpleLineIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface Props {
  mode: BudgetFormProps['mode'];
  categories: BudgetFormProps['categories'][];
  defaultValues?: BudgetFormProps['defaultValues'];
  budgetPeriod?: BudgetFormProps['budgetPeriod'][];
}

export default function BudgetForm({
  mode,
  categories,
  defaultValues,
  budgetPeriod,
}: Props) {
  const [open, setOpen] = useState(false);
  const title = mode === 'edit' ? 'Edit Budget' : 'Add Budget';
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Add Budget';

  const formProps =
    mode === 'edit' && defaultValues?.id
      ? BudgetController.update.form(defaultValues.id)
      : BudgetController.store.form();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'edit' ? (
          <Button variant="ghost" size="icon-sm">
            <PencilSimpleLineIcon weight="fill" color="#826CB0" />
            Edit Budget
          </Button>
        ) : (
          <Button>{title}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl">
          {mode === 'edit'
            ? `Editing ${defaultValues?.category_name}`
            : 'Add New Budget'}
        </DialogTitle>
        <DialogDescription>
          Choose a category to set a spending budget. These categories can help
          you monitoring spending.
        </DialogDescription>
        <Form
          {...formProps}
          onSuccess={() => setOpen(false)}
          options={{ preserveScroll: true }}
        >
          {({ processing, errors, resetAndClearErrors }) => (
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="category">Budget Category</FieldLabel>
                <Select
                  name="category_id"
                  defaultValue={defaultValues?.category_id.toString()}
                >
                  <SelectTrigger className="h-11 w-[180px]">
                    <SelectValue placeholder="Choose the Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        <div
                          className="rounded-full p-1.5"
                          style={{ backgroundColor: category.color }}
                        >
                          <Icon
                            name={category.icon}
                            color="white"
                            weight="fill"
                          />
                        </div>
                        <span>{category.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.category}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="amount">Maximum Spent</FieldLabel>
                <Input
                  id="amount"
                  name="budget_amount"
                  type="number"
                  inputMode="decimal"
                  step={0.01}
                  defaultValue={defaultValues?.budget_amount}
                  placeholder="$ e.g. 2000"
                  className="h-11"
                />
                <FieldError>{errors.budget_amount}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="period">Period</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the period" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetPeriod?.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.period_type}</FieldError>
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
                    cancel
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
