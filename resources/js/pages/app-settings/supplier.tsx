import DeleteSupplier from '@/components/delete-supplier';
import HeadingSmall from '@/components/heading-small';
import LockedField from '@/components/locked-field';
import SearchFilter from '@/components/search-filter';
import SupplierForm from '@/components/supplier-form';
import TablePagination from '@/components/table-pagination';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { CategoryOption, PaginatedSuppliers } from '@/types';
import { Head } from '@inertiajs/react';
import { DotsThreeIcon } from '@phosphor-icons/react';

interface SupplierProps {
  suppliers: PaginatedSuppliers;
  categories: CategoryOption[];
  filters: {
    search: string;
  };
}

export default function Supplier({
  suppliers,
  categories,
  filters,
}: SupplierProps) {
  return (
    <AppLayout title="App Settings">
      <Head title="Supplier settings" />

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

            <SupplierForm mode="create" categories={categories} />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden xl:table-cell">Address</TableHead>
                <TableHead></TableHead>
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
                        className="hidden sm:block"
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
                    {supplier.can.update || supplier.can.delete ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <DotsThreeIcon weight="regular" size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {supplier.can.delete && (
                            <DropdownMenuItem asChild>
                              <DeleteSupplier supplier={supplier} />
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {supplier.can.update && (
                            <DropdownMenuItem asChild>
                              <SupplierForm
                                mode="edit"
                                defaultValue={supplier}
                                categories={categories}
                              />
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <LockedField />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination links={suppliers.links} className={'mt-6'} />
        </div>
      </AppSettingsLayout>
    </AppLayout>
  );
}
