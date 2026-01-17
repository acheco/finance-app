import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn, resolveUrl } from '@/lib/utils';
import type { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function MobileNav({ NavItems }: { NavItems: NavItem[] }) {
  const page = usePage<SharedData>();
  const { auth } = page.props;
  const getInitials = useInitials();
  return (
    <nav className="fixed right-0 bottom-0 left-0 flex items-center justify-between bg-grey-900 px-4">
      {NavItems.map((item: NavItem, index: number) => {
        return (
          <div
            key={index}
            className={cn(
              'mt-2 grid h-[44px] w-[68.6px] grid-cols-1 grid-rows-[1fr_auto] place-items-center items-center overflow-hidden rounded-t-md md:h-[66px] md:w-[104px]',
              page.url.startsWith(resolveUrl(item.href))
                ? 'bg-beige-100'
                : 'bg-grey-900',
            )}
          >
            <Link
              href={item.href}
              className="flex flex-col items-center justify-center text-xs leading-[150%] font-bold"
            >
              <item.icon
                key={index}
                weight="fill"
                size={24}
                className={
                  page.url.startsWith(resolveUrl(item.href))
                    ? 'text-green-custom'
                    : 'text-grey-300'
                }
              />
              <span
                className={cn(
                  'hidden text-xs leading-[150%] md:block',
                  page.url.startsWith(resolveUrl(item.href))
                    ? 'font-bold text-grey-900'
                    : 'font-normal text-grey-300',
                )}
              >
                {item.title}
              </span>
            </Link>
            <div
              className={cn(
                'h-1 w-full bg-green-custom',
                page.url.startsWith(resolveUrl(item.href))
                  ? 'bg-green-custom'
                  : 'bg-grey-900',
              )}
            />
          </div>
        );
      })}
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-10 rounded-full p-1">
              <Avatar className="size-8 overflow-hidden rounded-full">
                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                  {getInitials(auth.user.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <UserMenuContent user={auth.user} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
