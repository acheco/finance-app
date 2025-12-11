import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import { cn, resolveUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  ArrowFatLinesLeftIcon,
  ArrowFatLinesRightIcon,
  ArrowsDownUpIcon,
  ChartDonutIcon,
  GearIcon,
  HouseIcon,
  ReceiptIcon,
  TipJarIcon,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

const mainNavItems: NavItem[] = [
  {
    title: 'Overview',
    href: dashboard(),
    icon: HouseIcon,
  },
  {
    title: 'Transactions',
    href: '#',
    icon: ArrowsDownUpIcon,
  },
  {
    title: 'Budgets',
    href: '#',
    icon: ChartDonutIcon,
  },
  {
    title: 'pots',
    href: '#',
    icon: TipJarIcon,
  },
  {
    title: 'Recurring Bills',
    href: '#',
    icon: ReceiptIcon,
  },
  {
    title: 'App Settings',
    href: '#',
    icon: GearIcon,
  },
];

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const page = usePage();

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  return (
    <aside
      className={cn(
        `row-span-full grid grid-rows-[100px_1fr_200px] overflow-x-hidden overflow-y-auto rounded-r-2xl bg-grey-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-[300px]' : 'w-[88px]'
        }`,
        className,
      )}
    >
      <header
        className={cn(
          'flex items-center justify-center px-4 text-2xl font-bold text-white',
          !sidebarOpen && 'max-w-[88px]',
        )}
      >
        <Button
          variant="ghost"
          size="lg"
          className="w-full hover:bg-grey-100/10 hover:text-white"
          asChild
        >
          <Link href={dashboard()} prefetch>
            <AppLogo />
          </Link>
        </Button>
      </header>

      <div className={cn(!sidebarOpen && 'max-w-[88px]')}>
        <nav>
          <ul>
            {mainNavItems.map((navItem: NavItem) => (
              <li
                key={navItem.title}
                className={cn(
                  !page.url.startsWith(resolveUrl(navItem.href)) &&
                    'hover:text-white',
                )}
              >
                <Link
                  href={navItem.href}
                  prefetch
                  className={cn(
                    'mr-2 flex min-h-[56px] max-w-[276px] items-center justify-start gap-4',
                    page.url.startsWith(resolveUrl(navItem.href))
                      ? 'rounded-r-lg border-l-6 border-l-green-custom bg-beige-100 text-grey-900'
                      : 'hover:text-beige-100',
                    sidebarOpen && 'px-8',
                  )}
                >
                  <navItem.icon
                    weight="fill"
                    size={24}
                    color={cn(
                      page.url.startsWith(resolveUrl(navItem.href))
                        ? '#277C78'
                        : '#b3b3b3',
                    )}
                    className={cn(!sidebarOpen && 'mx-auto')}
                  />
                  <span className={cn(!sidebarOpen && 'hidden')}>
                    {navItem.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <footer
        className={cn(
          'flex flex-col justify-evenly px-4',
          !sidebarOpen && 'max-w-[88px]',
        )}
      >
        <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn('px-4', !sidebarOpen && 'max-w-[88px]')}
        >
          {sidebarOpen ? (
            <span className="m-auto flex cursor-pointer items-center justify-start gap-4 text-grey-300">
              <ArrowFatLinesLeftIcon
                weight="fill"
                size={24}
                color={'#b3b3b3'}
              />
              Minimize Menu
            </span>
          ) : (
            <ArrowFatLinesRightIcon weight="fill" size={24} color={'#b3b3b3'} />
          )}
        </div>
        <NavUser sidebarOpen={sidebarOpen} />
      </footer>
    </aside>
  );
}
