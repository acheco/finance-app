import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { MobileNav } from '@/components/mobile-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { dashboard } from '@/routes';
import { index as budgets } from '@/routes/budgets';
import { index as transactions } from '@/routes/transactions';
import { NavItem } from '@/types';
import {
  ArrowsDownUpIcon,
  ChartDonutIcon,
  GearIcon,
  HouseIcon,
  ReceiptIcon,
  TipJarIcon,
} from '@phosphor-icons/react';
import React from 'react';

const NavItems: NavItem[] = [
  {
    title: 'Overview',
    href: dashboard(),
    icon: HouseIcon,
  },
  {
    title: 'Transaction',
    href: transactions(),
    icon: ArrowsDownUpIcon,
  },
  {
    title: 'budgets',
    href: budgets(),
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
    href: '/app-settings',
    icon: GearIcon,
  },
];

interface AppSidebarProps {
  title: string;
  children: React.ReactNode;
  withReturnButton?: boolean;
  backUrl?: string;
}

export default function AppSidebarLayout({
  children,
  title,
  withReturnButton,
  backUrl,
}: AppSidebarProps) {
  const isMobile = useIsMobile();

  return (
    <AppShell variant="mixed">
      {isMobile ? (
        <div className="grid h-screen grid-cols-1 grid-rows-[94px_1fr_52px] overflow-y-auto md:grid-rows-[94px_1fr_74px] lg:hidden">
          <AppHeader
            title={title}
            withReturnButton={withReturnButton}
            backUrl={backUrl}
          />
          {children}
          <MobileNav NavItems={NavItems} />
        </div>
      ) : (
        <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-10">
          <AppSidebar
            NavItems={NavItems}
            className="row-span-full overflow-y-hidden"
          />
          <main className="max-w-7xl overflow-y-auto">
            <AppHeader
              title={title}
              withReturnButton={withReturnButton}
              backUrl={backUrl}
            />
            {children}
          </main>
        </div>
      )}
    </AppShell>
  );
}
