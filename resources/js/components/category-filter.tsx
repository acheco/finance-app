import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { router, usePage } from '@inertiajs/react';
import { FunnelIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface PageProps extends InertiaPageProps {
  filters: {
    search: string;
    category_id: string;
    order_direction: 'asc' | 'desc';
  };
}

interface CategoryFilterProps {
  url: string;
  usedCategories: { id: number; name: string }[];
}

export default function CategoryFilter({
  url,
  usedCategories,
}: CategoryFilterProps) {
  const { filters } = usePage<PageProps>().props;
  const [currentCategory, setCurrentCategory] = useState<string>(
    filters.category_id || 'all',
  );
  const isMobile = useIsMobile();
  function handleCategoryChange(categoryId: string) {
    setCurrentCategory(categoryId);

    router.get(
      url,
      {
        search: filters.search,
        order_direction: filters.order_direction,
        category_id: categoryId === 'all' ? '' : categoryId,
      },
      { preserveScroll: true, preserveState: true, replace: true },
    );
  }

  return (
    <div className="flex items-center gap-2" data-testid="category-filter">
      <span className="hidden text-sm text-muted-foreground sm:block">
        Category:
      </span>
      <Select
        value={filters.category_id || 'all'}
        onValueChange={(value) => handleCategoryChange(value)}
      >
        <SelectTrigger
          className={cn(
            'transition-all duration-200',
            isMobile
              ? 'h-10 w-10 justify-center border-none bg-transparent p-0 shadow-none hover:bg-accent [&>svg]:hidden'
              : 'w-[180px]',
          )}
        >
          {isMobile && (
            <span>
              <FunnelIcon
                weight="fill"
                size={20}
                className="mr-2"
                color="text-grey-900"
              />
            </span>
          )}

          {!isMobile && (
            <SelectValue placeholder="Filtrar" className="w-auto" />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Transactions</SelectItem>
          {usedCategories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id.toString()}
              className={cn(
                currentCategory === category.id.toString() && 'font-bold',
              )}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
