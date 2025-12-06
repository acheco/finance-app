import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
  ArrowFatLinesLeftIcon,
  ArrowFatLinesRightIcon,
} from '@phosphor-icons/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import { useState } from 'react';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutGrid,
  },
];

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
];

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <aside
      className={cn(
        `row-span-full overflow-y-auto rounded-r-2xl bg-grey-900 p-4 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-[300px]' : 'w-[88px]'
        }`,
        className,
      )}
    >
      <header className="flex items-center justify-center text-2xl font-bold text-white">
        <Button variant="ghost" className="w-full hover:bg-grey-100" asChild>
          <Link href={dashboard()} prefetch>
            <AppLogo />
          </Link>
        </Button>
      </header>
      <div onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? (
          <span className="flex items-center justify-start gap-4 text-grey-300">
            <ArrowFatLinesLeftIcon weight="fill" size={24} color={'#b3b3b3'} />
            Minimize Menu
          </span>
        ) : (
          <ArrowFatLinesRightIcon weight="fill" size={24} color={'#b3b3b3'} />
        )}
      </div>
    </aside>
    // <Sidebar collapsible="icon" variant="floating" className="">
    //   <SidebarHeader>
    //     <SidebarMenu>
    //       <SidebarMenuItem>
    //         <SidebarMenuButton size="lg" asChild>
    //           <Link href={dashboard()} prefetch>
    //             <AppLogo />
    //           </Link>
    //         </SidebarMenuButton>
    //       </SidebarMenuItem>
    //     </SidebarMenu>
    //   </SidebarHeader>
    //
    //   <SidebarContent>
    //     <NavMain items={mainNavItems} />
    //   </SidebarContent>
    //
    //   <SidebarFooter>
    //     <NavFooter items={footerNavItems} className="mt-auto" />
    //     <NavUser />
    //   </SidebarFooter>
    // </Sidebar>
  );
}
