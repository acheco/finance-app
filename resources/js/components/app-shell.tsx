import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'header' | 'sidebar' | 'mixed';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
  const isOpen = usePage<SharedData>().props.sidebarOpen;

  if (variant === 'header') {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>;
  }

  if (variant === 'mixed') {
    return (
      <>
        <div className="flex min-h-screen w-full flex-col bg-beige-100 lg:hidden">
          {children}
        </div>
        <SidebarProvider defaultOpen={isOpen} className="hidden lg:block">
          {children}
        </SidebarProvider>
      </>
    );
  }

  return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
