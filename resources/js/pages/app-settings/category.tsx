import HeadingSmall from '@/components/heading-small';
import SearchFilter from '@/components/search-filter';
import TablePagination from '@/components/table-pagination';
import { Button } from '@/components/ui/button';
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

interface CategoryPageProps {
  categories: PaginatedCategories;
  filters: {
    search: string;
  };
}

export default function Category({ categories, filters }: CategoryPageProps) {
  return (
    <AppLayout title="App Settings">
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

            <Button>+ New Category</Button>
          </div>

          <div className="rounded-md bg-white p-8 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.data.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.transaction_type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TablePagination links={categories.links} className={'mt-6'} />
          </div>
        </div>
      </AppSettingsLayout>
    </AppLayout>
  );
}
