import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { trpc } from '@/utils/trpc';
import { Input, Button } from '@/components';

export default function SignUp() {
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
    <main>
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
          <Button type="submit">Register</Button>
        </form>
        <button
          className="font-semibold text-indigo-600 hover:text-indigo-500"
          onClick={() => router.push('/sign-in')}
        >
          Go to sign in
        </button>
      </div>
    </main>
  )
}
