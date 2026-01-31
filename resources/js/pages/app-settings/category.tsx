import CategoryForm from '@/components/category-form';
import DeleteCategory from '@/components/delete-category';
import HeadingSmall from '@/components/heading-small';
import Icon from '@/components/icon';
import LockedField from '@/components/locked-field';
import SearchFilter from '@/components/search-filter';
import TablePagination from '@/components/table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import AppSettingsLayout from '@/layouts/settings/app-settings-layout';
import { index as category } from '@/routes/categories';
import { PaginatedCategories } from '@/types';
import { Head } from '@inertiajs/react';

interface CategoryPageProps {
  categories: PaginatedCategories;
  colors: { value: string; label: string }[];
  filters: {
    search: string;
  };
}

export default function Category({
  categories,
  colors,
  filters,
}: CategoryPageProps) {
  return (
    <AppLayout title="App Settings">
      <Head title="Category settings" />

      <AppSettingsLayout>
        <HeadingSmall
          title="Category settings"
          description="See the app categories and manage your own."
        />

        <div className="space-y-4">
          <div className="flex w-full items-center justify-between gap-4">
            <SearchFilter
              initialValue={filters.search}
              url={category().url}
              placeholder="Search Category"
              onlyProps={['categories', 'filters']}
            />

            <CategoryForm mode="create" colors={colors} />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="flex items-center gap-2 rounded-full">
                    <div
                      style={{ backgroundColor: category.color }}
                      className="rounded-full p-1"
                    >
                      <Icon
                        name={category.icon}
                        weight="fill"
                        color="white"
                        size={16}
                      />
                    </div>
                    {category.name}
                  </TableCell>
                  <TableCell>{category.transaction_type}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {category.can.delete && (
                      <DeleteCategory category={category} />
                    )}
                    {category.can.update && (
                      <CategoryForm
                        mode="edit"
                        defaultValue={category}
                        colors={colors}
                      />
                    )}
                    {!category.can.update && !category.can.delete && (
                      <LockedField />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination links={categories.links} className={'mt-6'} />
        </div>
      </AppSettingsLayout>
    </AppLayout>
  );
}
