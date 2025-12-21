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
import React from 'react';

interface TablePaginationProps {
  links: PaginationLinkType[];
  className?: string;
}

export default function TablePagination({
  links,
  className,
}: TablePaginationProps) {
  if (links.length <= 3) return null;

  const prevLink = links[0];
  const nextLink = links[links.length - 1];
  const pageLinks = links.slice(1, -1);

  const getVisiblePages = () => {
    const total = pageLinks.length;
    const currentIdx = pageLinks.findIndex((link) => link.active);
    const current = currentIdx + 1;
    const delta = 1; // Páginas a los lados

    return pageLinks.filter((_, index) => {
      const pageNum = index + 1;
      if (pageNum === 1 || pageNum === total) return true;
      return pageNum >= current - delta && pageNum <= current + delta;
    });
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className={cn('select-none', className)}>
      <PaginationContent className="w-full justify-between gap-0">
        <PaginationItem>
          <PaginationPrevious
            href={prevLink.url || '#'}
            className={cn(
              'border-1 border-beige-500 px-3 text-grey-900 sm:px-4',
              !prevLink.url && 'pointer-events-none opacity-50',
            )}
          />
        </PaginationItem>

        <div className="flex flex-row items-center gap-1">
          {visiblePages.map((link, index) => {
            const prevVisible = visiblePages[index - 1];
            const showEllipsis =
              prevVisible &&
              parseInt(link.label) - parseInt(prevVisible.label) > 1;

            return (
              <React.Fragment key={`page-${index}`}>
                {showEllipsis && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    href={link.url || '#'}
                    isActive={link.active}
                    className={cn(
                      link.active
                        ? 'hover:bg-grey-800 bg-grey-900 text-white'
                        : 'border-1 border-beige-500 text-grey-900 hover:bg-beige-100',
                    )}
                  >
                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            );
          })}
        </div>

        <PaginationItem>
          <PaginationNext
            href={nextLink.url || '#'}
            className={cn(
              'border-1 border-beige-500 px-3 text-grey-900 sm:px-4',
              !nextLink.url && 'pointer-events-none opacity-50',
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
