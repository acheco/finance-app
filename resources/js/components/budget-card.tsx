import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react';

export default function BudgetCard() {
  return (
    <Card className="w-[343px] gap-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="h-[16px] w-[16px] rounded-full bg-green-custom" />
          Entertainment
        </CardTitle>
        <CardAction>
          <Button variant="ghost" className="flex items-center">
            <DotsThreeIcon color="text-grey-300" height={16} width={16} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div>
          <p className="pb-4 text-sm text-grey-500">Maximum of $50.00</p>
          <div className="flex h-[32px] items-center rounded-sm bg-beige-100 px-1">
            <Progress
              value={50}
              max={50}
              className={cn(
                `h-[24px] w-full rounded-sm bg-beige-100 [&>div]:${'bg-green-custom'} [&>div]:rounded-sm`,
              )}
            />
          </div>
        </div>
        <div className="mt-4 flex h-[43px] justify-start text-sm text-grey-500">
          <div className="flex items-center gap-4" style={{ width: '50%' }}>
            <div className={cn('h-full w-1 rounded-md bg-green-custom')} />
            <div className="space-y-1">
              <p className="text-xs">Spent</p>
              <p className="font-bold text-black">$25.00</p>
            </div>
          </div>
          <div className={'flex items-center gap-4'}>
            <div className={cn('h-full w-1 rounded-md bg-beige-100')} />
            <div className="space-y-1">
              <p className="text-xs">Remaining</p>
              <p className="text-sm font-bold text-black">$35.00</p>
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-md bg-beige-100 p-4">
          <div className="bg-beige-100v flex items-center justify-between pb-5">
            <h2 className="text-sm font-bold">Latest Spending</h2>
            <Button variant="link" className="text-sm text-grey-500" size="sm">
              See All <CaretRightIcon weight="fill" color="#696969" />
            </Button>
          </div>
          <Table>
            <TableBody>
              <TableRow className="h-[40px]">
                <TableCell className="flex items-center gap-2 px-0 text-xs font-bold">
                  <div className="h-8 w-8 rounded-full bg-green-custom" />
                  James Thompson
                </TableCell>
                <TableCell className="text-right">
                  <p className="pb-1 text-xs font-bold">-$5.00</p>
                  <p className="text-xs text-grey-500">16 Aug 2024</p>
                </TableCell>
              </TableRow>
              <TableRow className="h-[40px]">
                <TableCell className="flex items-center gap-2 px-0 text-xs font-bold">
                  <div className="h-8 w-8 rounded-full bg-green-custom" />
                  James Thompson
                </TableCell>
                <TableCell className="text-right">
                  <p className="pb-1 text-xs font-bold">-$5.00</p>
                  <p className="text-xs text-grey-500">16 Aug 2024</p>
                </TableCell>
              </TableRow>
              <TableRow className="h-[40px]">
                <TableCell className="flex items-center gap-2 px-0 text-xs font-bold">
                  <div className="h-8 w-8 rounded-full bg-green-custom" />
                  James Thompson
                </TableCell>
                <TableCell className="text-right">
                  <p className="pb-1 text-xs font-bold">-$5.00</p>
                  <p className="text-xs text-grey-500">16 Aug 2024</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
