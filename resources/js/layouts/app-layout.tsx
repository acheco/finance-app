import FlashMessages from '@/components/flash-message';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-mixed-layout';
import { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  withReturnButton?: boolean;
  backUrl?: string;
  withCreateButton?: boolean;
  createButtonLabel?: string;
  createButtonHref?: string;
}

export default ({
  children,
  title,
  withReturnButton,
  backUrl,
  withCreateButton,
  createButtonLabel,
  createButtonHref,
  ...props
}: AppLayoutProps) => (
  <AppLayoutTemplate
    title={title}
    withReturnButton={withReturnButton}
    backUrl={backUrl}
    withCreateButton={withCreateButton}
    createButtonLabel={createButtonLabel}
    createButtonHref={createButtonHref}
    {...props}
  >
    {children}
    <Toaster position="top-right" duration={3000} closeButton richColors />
    <FlashMessages />
  </AppLayoutTemplate>
);
