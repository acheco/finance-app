import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps {}
export default function DataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currencies.data.map((currency) => (
          <TableRow key={currency.id}>
            <TableCell>{currency.name}</TableCell>
            <TableCell>{currency.symbol}</TableCell>
            <TableCell>actions goes here</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
