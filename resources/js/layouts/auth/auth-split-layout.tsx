import AppBigLogo from '@/components/app-big-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
  title?: string;
  description?: string;
}

export default function AuthSplitLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  const { name } = usePage<SharedData>().props;

  return (
    <div className="relative grid h-dvh flex-col items-center bg-beige-100 sm:px-0 lg:max-w-none lg:grid-cols-[500px_1fr] lg:justify-center lg:px-0 xl:grid-cols-2">
      <header className="absolute top-0 right-0 left-0 z-20 rounded-b-lg bg-grey-900 p-6 text-center text-3xl text-white lg:hidden">
        <Link href={home().url}>Finance</Link>
      </header>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link
          href={home()}
          className="relative z-20 flex items-center text-4xl font-medium xl:justify-center"
        >
          <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
          {name}
        </Link>
        <AppBigLogo className="relative z-20 m-auto flex size-4/5" />

        <div className="relative z-20 mt-auto xl:flex xl:items-center xl:justify-center">
          <blockquote className="space-y-2 text-start">
            <p className="text-3xl font-bold">
              Keep track of your money <br />
              and save for your future
            </p>
            <footer className="text-sm leading-[150%] text-neutral-300">
              Personal finance app puts you in control of your spending. Track{' '}
              <br />
              transactions, set budgets, and add to savings pots easily.
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="w-full">
        <div className="mx-auto flex w-[350px] flex-col justify-center space-y-6 rounded-lg bg-white p-4 md:w-[560px] lg:w-[450px] xl:w-[560px]">
          <div className="flex flex-col items-start gap-2 text-left">
            <h1 className="text-3xl leading-[120%] font-bold tracking-normal text-grey-900 dark:text-gray-900">
              {title}
            </h1>
            <p className="text-sm text-balance text-muted-foreground">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
