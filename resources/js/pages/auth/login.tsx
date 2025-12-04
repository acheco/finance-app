import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
  canRegister: boolean;
}

export default function Login({
  status,
  canResetPassword,
  canRegister,
}: LoginProps) {
  return (
    <AuthLayout title="Login">
      <Head title="Log in" />

      <Form
        {...store.form()}
        resetOnSuccess={['password']}
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
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
                  name="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  placeholder="email@example.com"
                  className="h-[45px] dark:text-grey-900"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="stroke-0 leading-[150%] font-bold text-beige-500"
                  >
                    Password
                  </Label>
                  {canResetPassword && (
                    <TextLink
                      href={request()}
                      className="ml-auto text-sm text-beige-500"
                      tabIndex={5}
                    >
                      Forgot password?
                    </TextLink>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  placeholder="Password"
                  className="h-[45px] dark:text-grey-900"
                />
                <InputError message={errors.password} />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="remember"
                  name="remember"
                  tabIndex={3}
                  className="dark:checked:bg-grey-900"
                />
                <Label htmlFor="remember" className="text-beige-500">
                  Remember me
                </Label>
              </div>

              <Button
                type="submit"
                size="xl"
                className="mt-4 w-full dark:bg-grey-900 dark:text-white"
                tabIndex={4}
                disabled={processing}
                data-test="login-button"
              >
                {processing && <Spinner />}
                Log in
              </Button>
            </div>

            {canRegister && (
              <div className="text-center text-sm text-muted-foreground">
                Need to create an account?{' '}
                <TextLink
                  href={register()}
                  tabIndex={5}
                  className="font-bold text-grey-900 dark:text-grey-900 dark:hover:text-grey-900/70"
                >
                  Sign Up
                </TextLink>
              </div>
            )}
          </>
        )}
      </Form>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}
    </AuthLayout>
  );
}
