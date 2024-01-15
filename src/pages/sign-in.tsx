import { useEffect } from 'react';
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import { trpc } from '@/utils/trpc';
import { Input, Button } from '@/components';
import { signInSchema } from '@/schema';

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutateAsync: trpcLogin } = trpc.authRouter.loginUser.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);

  return (
    <main>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="flex w-full items-center justify-center min-h-screen">
        <div className="w-[400px] border border-gray-100 mx-auto p-10 shadow-md rounded-md">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              onSubmit={handleSubmit(async ({ email, password }) => {
                const user = await trpcLogin({ email, password });
                const result = await signIn("credentials", user);

                if (!result?.error) {
                  router.push("/");
                }
              })}
            >
              <Input
                label="Email"
                error={errors?.email?.message}
                {...register("email")}
              />
              <Input
                label="Password"
                type="password"
                error={errors?.password?.message}
                {...register("password")}
              />
              <div className="flex w-full justify-center mt-6">
                <Button type="submit">Login</Button>
              </div>
            </form>
            <div className="flex w-full justify-center mt-4">
              <button
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={() => router.push('/sign-up')}
              >
                Go to sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignIn;
