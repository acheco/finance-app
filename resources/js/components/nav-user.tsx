import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { CaretUpDownIcon } from '@phosphor-icons/react';

export function NavUser({ sidebarOpen }: { sidebarOpen?: boolean }) {
  const { auth } = usePage<SharedData>().props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-grey-900 hover:bg-grey-900">
        <Button
          size={sidebarOpen ? 'lg' : 'icon'}
          className={cn(
            'text-sidebar-accent-foreground',
            !sidebarOpen && 'px-8',
          )}
          data-test="sidebar-menu-button"
        >
          <UserInfo user={auth.user} />
          <CaretUpDownIcon
            weight="fill"
            color="#b3b3b3"
            className={cn('ml-auto size-4', !sidebarOpen && 'hidden')}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
      >
        <UserMenuContent user={auth.user} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
