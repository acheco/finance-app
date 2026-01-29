import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { index as accounts } from '@/routes/accounts';
import { index as categories } from '@/routes/categories';
import { index as currencies } from '@/routes/currencies';
import { index as suppliers } from '@/routes/suppliers';
import { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BankIcon, CurrencyDollarIcon, StorefrontIcon, TagIcon } from '@phosphor-icons/react';
import React from 'react';

const sidebarNavItems: NavItem[] = [
  {
    title: 'Accounts',
    href: accounts(),
    icon: BankIcon,
  },
  {
    title: 'Suppliers',
    href: suppliers(),
    icon: StorefrontIcon,
  },
  {
    title: 'Currencies',
    href: currencies(),
    icon: CurrencyDollarIcon,
  },
  {
    title: 'Categories',
    href: categories(),
    icon: TagIcon,
  },
];

interface AppSettingsLayoutProps {
  children: React.ReactNode;
}

export default function AppSettingsLayout({
  children,
}: AppSettingsLayoutProps) {
  const currentPath = window.location.pathname;

  return (
    <div className="px-4 py-2">
      <aside className="w-full max-w-xl sm:hidden">
        <nav className="flex flex-col space-y-1 space-x-0">
          {sidebarNavItems.map((item, index) => (
            <Button
              key={`${resolveUrl(item.href)}-${index}`}
              size="sm"
              variant="ghost"
              asChild
              className={cn(
                'w-full justify-start hover:bg-grey-900 hover:text-white',
                {
                  'bg-grey-900 text-white': isSameUrl(currentPath, item.href),
                },
              )}
            >
              <Link href={item.href}>
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </aside>
      <Separator className="my-6 sm:hidden" />

      <NavigationMenu className="my-4 hidden sm:flex">
        <NavigationMenuList>
          {sidebarNavItems.map((navItem, index: number) => (
            <NavigationMenuItem key={index} className="hover:text-white">
              <NavigationMenuLink
                asChild
                className={cn(navigationMenuTriggerStyle(), {
                  'bg-grey-900 text-white': isSameUrl(
                    currentPath,
                    navItem.href,
                  ),
                })}
              >
                <Link href={navItem.href}>{navItem.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <section className="space-y-8 rounded-md bg-white p-8 shadow-sm xl:max-w-6xl">
        {children}
      </section>
    </div>
  );
}
