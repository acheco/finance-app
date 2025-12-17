import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { router } from '@inertiajs/react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface SearchFilterProps {
  initialValue?: string;
  placeholder?: string;
  url: string;
  debounceMs?: number;
  onlyProps?: string[];
  className?: string;
  label?: string;
  showLabel?: boolean;
}

export default function SearchFilter({
  initialValue = '',
  placeholder = 'Search...',
  url,
  debounceMs = 500,
  onlyProps = [],
  className = '',
  label = 'Search',
  showLabel = false,
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm] = useDebounce(searchTerm, debounceMs);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === initialValue) return;

    if (debouncedSearchTerm !== initialValue) {
      router.get(
        url,
        { search: debouncedSearchTerm, page: 1 },
        {
          preserveScroll: true,
          preserveState: true,
          replace: true,
          only: onlyProps.length > 0 ? onlyProps : undefined,
        },
      );
    }
  }, [debouncedSearchTerm, initialValue, url, onlyProps]);

  return (
    <Field className={className}>
      <FieldLabel htmlFor="search" className={showLabel ? '' : 'sr-only'}>
        {label}
      </FieldLabel>
      <InputGroup className="max-w-lg bg-white">
        <InputGroupInput
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
        />
        <InputGroupAddon align="inline-end">
          <MagnifyingGlassIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
