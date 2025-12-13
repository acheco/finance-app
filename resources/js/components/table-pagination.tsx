import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { PaginationLink as PaginationLinkType } from '@/types';

interface TablePaginationProps {
  links: PaginationLinkType[];
  className?: string;
}

export default function TablePagination({
  links,
  className,
}: TablePaginationProps) {
  const prevLink = links[0];
  const nextLink = links[links.length - 1];
  const pageLinks = links.slice(1, -1);

  return (
    <Pagination className={className}>
      <PaginationContent className={'w-full justify-between'}>
        {/* Previous Button */}
        <PaginationItem>
          {prevLink.url ? (
            <PaginationPrevious
              href={prevLink.url}
              className={'border-1 border-beige-500 text-grey-900'}
            />
          ) : (
            <PaginationPrevious
              href="#"
              className="pointer-events-none border-1 border-beige-500 text-grey-900 opacity-50"
            />
          )}
        </PaginationItem>
        <div className={'flex flex-row items-center gap-1'}>
          {/* Page Numbers */}
          {pageLinks.map((link, index) => {
            if (link.label.includes('...')) {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={`page-${link.page}-${index}`}>
                <PaginationLink
                  href={link.url || '#'}
                  isActive={link.active}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className={cn(
                    link.active
                      ? 'bg-grey-900 text-white'
                      : 'border-1 border-beige-500 text-grey-900',
                  )}
                />
              </PaginationItem>
            );
          })}
        </div>

        {/* Next Button */}
        <PaginationItem>
          {nextLink.url ? (
            <PaginationNext
              href={nextLink.url}
              className={'border-1 border-beige-500 text-grey-900'}
            />
          ) : (
            <PaginationNext
              href="#"
              className="pointer-events-none border-1 border-beige-500 text-grey-900 opacity-50"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
