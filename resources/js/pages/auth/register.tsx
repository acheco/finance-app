import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
  return (
    <AuthLayout title="Sign Up">
      <Head title="Register" />
      <Form
        {...store.form()}
        resetOnSuccess={['password', 'password_confirmation']}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="stroke-0 leading-[150%] font-bold text-beige-500 dark:text-beige-500"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="name"
                  name="name"
                  placeholder="Full name"
                  className="h-[45px] dark:text-grey-900"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="stroke-0 leading-[150%] font-bold text-beige-500 dark:text-beige-500"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  name="email"
                  placeholder="email@example.com"
                  className="h-[45px] dark:text-grey-900"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="password"
                  className="stroke-0 leading-[150%] font-bold text-beige-500 dark:text-beige-500"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  tabIndex={3}
                  autoComplete="new-password"
                  name="password"
                  placeholder="Password"
                  className="h-[45px] dark:text-grey-900"
                />
                <InputError message={errors.password} />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="password_confirmation"
                  className="stroke-0 leading-[150%] font-bold text-beige-500 dark:text-beige-500"
                >
                  Confirm password
                </Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  name="password_confirmation"
                  placeholder="Confirm password"
                  className="h-[45px] dark:text-grey-900"
                />
                <InputError message={errors.password_confirmation} />
              </div>

              <Button
                type="submit"
                size="xl"
                className="mt-2 w-full dark:bg-grey-900 dark:text-white"
                tabIndex={5}
                data-test="register-user-button"
              >
                {processing && <Spinner />}
                Create account
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <TextLink
                href={login()}
                tabIndex={6}
                className="font-bold dark:text-grey-900"
              >
                Log in
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  );
}
