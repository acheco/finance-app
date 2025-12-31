import CategoryFilter from '@/components/category-filter';
import SortingFilter from '@/components/sorting-filter';
import { index as transaction } from '@/routes/transactions';
import { router } from '@inertiajs/react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

interface TransactionFiltersProps {
  usedCategories: { id: number; name: string }[];
  filters: {
    search: string;
    category_id: string;
    order_direction: 'asc' | 'desc';
  };
}

export default function TransactionFilters({
  usedCategories,
  filters,
}: TransactionFiltersProps) {
  function handleFilterChange(key: string, value: string) {
    if (key === 'category_id' && value === 'all') {
      value = '';
    }

    router.get(
      transaction().url,
      {
        ...filters,
        [key]: value,
      },
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
      },
    );
  }

  return (
    <div
      className="flex w-full items-center justify-between gap-4"
      data-testid="transaction-filters"
    >
      <div className="relative max-w-[320px] flex-1">
        <input
          type="text"
          defaultValue={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Search transaction"
          className="w-full rounded-lg border px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
          <MagnifyingGlassIcon size={20} />
        </button>
      </div>

      <div
        className="flex items-center gap-2"
        data-testid="transaction-filters-dropdowns"
      >
        <SortingFilter url={transaction().url} />
        <CategoryFilter
          url={transaction().url}
          usedCategories={usedCategories}
        />
      </div>
    </div>
  );
}
