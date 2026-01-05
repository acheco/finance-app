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
import { SortAscendingIcon, SortDescendingIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface PageProps extends InertiaPageProps {
  filters: {
    search: string;
    category_id: string;
    order_direction: 'asc' | 'desc';
  };
}

export default function SortingFilter({ url }: { url: string }) {
  const { filters } = usePage<PageProps>().props;
  const [direction, setDirection] = useState<'asc' | 'desc'>(
    filters.order_direction,
  );

  const isMobile = useIsMobile();

  const handleSort = (newDirection: 'asc' | 'desc') => {
    setDirection(newDirection);

    router.get(
      url,
      {
        search: filters.search,
        category_id: filters.category_id,
        order_direction: newDirection,
      },
      { preserveScroll: true, preserveState: true, replace: true },
    );
  };

  return (
    <div className="flex items-center gap-2">
      {!isMobile && <p className="text-sm text-muted-foreground">Sort by:</p>}
      <Select
        defaultValue={filters.order_direction === 'asc' ? 'asc' : 'desc'}
        onValueChange={(value) => handleSort(value as 'asc' | 'desc')}
      >
        <SelectTrigger
          className={cn(
            'transition-all duration-200',
            isMobile
              ? 'h-10 w-10 justify-center border-none bg-transparent p-0 shadow-none hover:bg-accent [&>svg]:hidden'
              : 'w-fit',
          )}
        >
          {isMobile && (
            <div className="transition outline-none hover:opacity-70">
              {direction === 'desc' ? (
                <SortDescendingIcon
                  weight="fill"
                  size={20}
                  color="text-grey-900"
                />
              ) : (
                <SortAscendingIcon
                  weight="fill"
                  size={20}
                  color="text-grey-900"
                />
              )}
            </div>
          )}
          {!isMobile && <SelectValue />}
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="desc"
            className={cn(direction === 'desc' && 'font-bold')}
          >
            Latest
          </SelectItem>
          <SelectItem
            value="asc"
            className={cn(direction === 'asc' && 'font-bold')}
          >
            Oldest
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
