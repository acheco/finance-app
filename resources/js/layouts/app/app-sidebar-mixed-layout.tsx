import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { MobileNav } from '@/components/mobile-nav';
import React from 'react';

interface AppSidebarProps {
  title: string;
  children: React.ReactNode;
}
export default function AppSidebarLayout({ children, title }: AppSidebarProps) {
  return (
    // <AppShell variant="sidebar">
    //   <AppSidebar />
    //   <AppContent variant="sidebar" className="overflow-x-hidden">
    //     <AppSidebarHeader breadcrumbs={breadcrumbs} />
    //     {children}
    //   </AppContent>
    // </AppShell>

    <AppShell variant="mixed">
      <div className="grid h-screen grid-cols-1 grid-rows-[94px_1fr_52px] md:grid-rows-[94px_1fr_74px] lg:hidden">
        <AppHeader title={title} />
        {children}
        <MobileNav />
      </div>
    </AppShell>
  );
}
