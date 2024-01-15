import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import { trpc } from '@/utils/trpc';
import { Input, Button } from '@/components';
import { signUpSchema } from '@/schema';

type FormType = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutateAsync: trpcSignUp } = trpc.authRouter.createUser.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
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
        <title>Sign up</title>
      </Head>
      <div className="flex w-full items-center justify-center min-h-screen">
        <div className="w-[400px] border border-gray-100 mx-auto p-10 shadow-md rounded-md">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Please register
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <form
                onSubmit={handleSubmit(async ({ username, email, password }) => {
                  await trpcSignUp({ username, email, password });

                  router.push("/sign-in");
                })}
              >
                <Input
                  label="Email"
                  error={errors?.email?.message}
                  {...register("email")}
                />
                <Input
                  label="Username"
                  error={errors?.username?.message}
                  {...register("username")}
                />
                <Input
                  label="Password"
                  error={errors?.password?.message}
                  type="password"
                  {...register("password")}
                />
                <div className="flex w-full justify-center mt-6">
                  <Button type="submit">Register</Button>
                </div>
              </form>
              <div className="flex w-full justify-center mt-4">
                <button
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  onClick={() => router.push('/sign-in')}
                >
                  Go to sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUp;
