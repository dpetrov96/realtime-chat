import { useEffect } from 'react';
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { trpc } from '@/utils/trpc';

export default function SignIn() {
  const router = useRouter();
  const { data: session } = useSession();
  const { mutateAsync: trpcLogin } = trpc.authRouter.loginUser.useMutation();

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
      <div>
        <button onClick={async () => {
          const user = await trpcLogin({ email: "test2@test.com", password: "password" });
          const result = await signIn("credentials", user);
      
          if (!result?.error) {
            router.push("/");
          }
        }}>Login</button>
      </div>
    </main>
  )
}
