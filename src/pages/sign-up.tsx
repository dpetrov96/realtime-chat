import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { trpc } from '@/utils/trpc';

export default function SignUp() {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutateAsync: trpcSignUp } = trpc.authRouter.createUser.useMutation();

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
      <button onClick={async () => {
          await trpcSignUp({ username: "testtt", email: "test332@test.com", password: "password" });
          router.push("/sign-in");
        }}>Register</button>
      </div>
    </main>
  )
}
