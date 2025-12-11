import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { MobileNav } from '@/components/mobile-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import React from 'react';

interface AppSidebarProps {
  title: string;
  children: React.ReactNode;
}

export default function AppSidebarLayout({ children, title }: AppSidebarProps) {
  const isMobile = useIsMobile();

  return (
    <AppShell variant="mixed">
      {isMobile ? (
        <div className="grid h-screen grid-cols-1 grid-rows-[94px_1fr_52px] overflow-y-auto md:grid-rows-[94px_1fr_74px] lg:hidden">
          <AppHeader title={title} />
          {children}
          <MobileNav />
        </div>
      ) : (
        <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-10">
          <AppSidebar className="row-span-full overflow-y-hidden" />
          <main className="overflow-y-auto">
            <AppHeader title={title} />
            {children}
          </main>
        </div>
      )}
    </AppShell>
  );
}
