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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field';
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
  currencies: BudgetFormProps['currencies'][];
  defaultValues?: BudgetFormProps['defaultValues'];
  budgetPeriod?: BudgetFormProps['budgetPeriod'][];
}

type periodType = 'monthly' | 'yearly' | 'custom';

export default function BudgetForm({
  mode,
  categories,
  currencies,
  defaultValues,
  budgetPeriod,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<periodType>(
    defaultValues?.period_type || 'monthly',
  );
  const [startDate, setStartDate] = useState<string>(
    defaultValues?.start_date ? defaultValues.start_date.toString() : '',
  );
  const [endDate, setEndDate] = useState<string>(
    defaultValues?.end_date ? defaultValues.end_date.toString() : '',
  );

  const title = mode === 'edit' ? 'Edit Budget' : '+ Add New Budget';
  const submitLabel = mode === 'edit' ? 'Save Changes' : 'Add Budget';

  const calculateEndDate = (start: string, period: string) => {
    if (!start || period === 'custom') return;

    const date = new Date(`${start}T00:00:00`);

    if (isNaN(date.getTime())) {
      setEndDate('');
      return;
    }

    if (period === 'monthly') {
      date.setMonth(date.getMonth() + 1);
    } else if (period === 'yearly') {
      date.setFullYear(date.getFullYear() + 1);
    }

    date.setDate(date.getDate() - 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (isNaN(year)) {
      setEndDate('');
      return;
    }

    setEndDate(`${year}-${month}-${day}`);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    setStartDate(newStart);

    if (selectedPeriod !== 'custom') {
      calculateEndDate(newStart, selectedPeriod);
    }
  };

  const handlePeriodChange = (type: periodType) => {
    setSelectedPeriod(type);

    if (type !== 'custom') {
      calculateEndDate(startDate, type);
    }
  };

  const formProps =
    mode === 'edit' && defaultValues?.id
      ? BudgetController.update.form(Number(defaultValues.id))
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
          <Button size="xl">{title}</Button>
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
                <FieldError>{errors.category_id}</FieldError>
              </Field>
              <FieldGroup className="flex flex-row gap-2">
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
                  <FieldLabel htmlFor="currency_id">Currency</FieldLabel>
                  <Select
                    name="currency_id"
                    defaultValue={defaultValues?.currency_id.toString()}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies?.map((currency) => (
                        <SelectItem
                          key={currency.id}
                          value={currency.id.toString()}
                        >
                          {currency.code} {currency.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError>{errors.currency_id}</FieldError>
                </Field>
              </FieldGroup>
              <Field>
                <FieldLabel htmlFor="period_type">Period</FieldLabel>
                <Select
                  name="period_type"
                  value={selectedPeriod}
                  onValueChange={handlePeriodChange}
                >
                  <SelectTrigger className="h-11">
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

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="start_date">Start Date</FieldLabel>
                  <input
                    id="start_date"
                    name="start_date"
                    type="date"
                    className="min-h-11 w-full rounded-md border border-input bg-background px-2"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <FieldError>{errors.start_date}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="end_date">End Date</FieldLabel>
                  <input
                    id="end_date"
                    name="end_date"
                    type="date"
                    className={`min-h-11 w-full rounded-md border border-input bg-background px-2 ${selectedPeriod !== 'custom' ? 'bg-gray-50 opacity-80' : ''}`}
                    value={endDate}
                    onChange={(e) =>
                      selectedPeriod === 'custom' && setEndDate(e.target.value)
                    }
                    readOnly={selectedPeriod !== 'custom'}
                  />
                  <FieldError>{errors.end_date}</FieldError>
                </Field>
              </FieldGroup>

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
