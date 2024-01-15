import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { trpc } from '@/utils/trpc';
import { Input, Button } from '@/components';
import AuthLayout from '@/layouts/AuthLayout';

const SignUp = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutateAsync: trpcSignUp } = trpc.authRouter.createUser.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
    <AuthLayout title="Please register">
      <Head>
        <title>Sign Up</title>
      </Head>
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
    </AuthLayout>
  )
}

export default SignUp;
