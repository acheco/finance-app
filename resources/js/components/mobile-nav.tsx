import { cn, isSameUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  ArrowsDownUpIcon,
  ChartDonutIcon,
  GearIcon,
  HouseIcon,
  ReceiptIcon,
  TipJarIcon,
} from '@phosphor-icons/react';

const NavItems: NavItem[] = [
  {
    title: 'Dashboard',
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
    title: 'Pots',
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

export function MobileNav() {
  const page = usePage<SharedData>();

  return (
    <nav className="flex items-end justify-between bg-grey-900 px-4">
      {NavItems.map((item: NavItem, index: number) => {
        return (
          <div
            key={index}
            className={cn(
              'grid h-[44px] w-[68.6px] grid-cols-1 grid-rows-[1fr_auto] place-items-center items-center overflow-hidden rounded-t-md md:h-[66px] md:w-[104px]',
              isSameUrl(page.url, item.href) ? 'bg-beige-100' : 'bg-grey-900',
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
                  isSameUrl(page.url, item.href)
                    ? 'text-green-custom'
                    : 'text-grey-300'
                }
              />
              <span
                className={cn(
                  'hidden text-xs leading-[150%] md:block',
                  isSameUrl(page.url, item.href)
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
                isSameUrl(page.url, item.href)
                  ? 'bg-green-custom'
                  : 'bg-grey-900',
              )}
            />
          </div>
        );
      })}
    </nav>
  );
}
