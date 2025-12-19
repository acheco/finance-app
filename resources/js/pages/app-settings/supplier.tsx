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
import { index as supplier } from '@/routes/suppliers';
import { PaginatedSuppliers } from '@/types';

interface SupplierProps {
  suppliers: PaginatedSuppliers;
  filters: {
    search: string;
  };
}

export default function Supplier({ suppliers, filters }: SupplierProps) {
  return (
    <AppLayout title="App Settings">
      <AppSettingsLayout>
        <HeadingSmall
          title="Suppliers Settings"
          description="Manage your suppliers"
        />

        <div className="space-y-4">
          <div className="flex w-full items-center justify-between gap-4">
            <SearchFilter
              initialValue={filters.search}
              url={supplier().url}
              placeholder="Search Supplier"
              onlyProps={['suppliers', 'filters']}
            />

            <Button>+ Add Supplier</Button>
          </div>

          <div className="rounded-md bg-white p-8 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Address
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.data.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={supplier.logo}
                          alt={supplier.name}
                          width="20"
                          height="20"
                        />
                        <p>{supplier.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {supplier.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {supplier.phone || '-'}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {supplier.address || '-'}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      {/*{category.can.delete && (*/}
                      {/*  <DeleteCategory category={category} />*/}
                      {/*)}*/}
                      {/*{category.can.update && (*/}
                      {/*  <CategoryForm mode="edit" defaultValue={category} />*/}
                      {/*)}*/}
                      {/*{!category.can.update && !category.can.delete && (*/}
                      {/*  <span>-</span>*/}
                      {/*)}*/}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination links={suppliers.links} className={'mt-6'} />
          </div>
        </div>
      </AppSettingsLayout>
    </AppLayout>
  );
}
