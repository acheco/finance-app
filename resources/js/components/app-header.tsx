import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowFatLinesLeftIcon } from '@phosphor-icons/react';

interface AppHeaderProps {
  title: string;
  withReturnButton?: boolean;
  backUrl?: string;
}
export function AppHeader({
  title,
  withReturnButton = false,
  backUrl,
}: AppHeaderProps) {
  const page = usePage<SharedData>();
  const { auth } = page.props;
  const getInitials = useInitials();
  return (
    <div className="my-auto p-4">
      <div className="flex h-16 items-center md:max-w-7xl lg:m-0 lg:px-0">
        <h1 className="flex items-center gap-4 stroke-0 text-[32px] leading-[120%] font-bold text-grey-900">
          {withReturnButton && (
            <Link replace href={backUrl ?? '#'} viewTransition>
              <Button size="icon">
                <ArrowFatLinesLeftIcon weight="fill" />
              </Button>
            </Link>
          )}
          {title}
        </h1>
        <div className="ml-auto flex items-center space-x-2 lg:hidden">
          <div className="relative flex items-center space-x-1"></div>
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
      </div>
    </div>
  );
}
