import FlashMessages from '@/components/flash-message';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-mixed-layout';
import { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export default ({ children, title, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate title={title} {...props}>
    {children}

    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      duration={3000}
    />
    <FlashMessages />
  </AppLayoutTemplate>
);
