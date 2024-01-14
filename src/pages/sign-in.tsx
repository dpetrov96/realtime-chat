import Head from 'next/head'

import { trpc } from '@/utils/trpc'

export default function SignIn() {
  const { mutateAsync: signIn } = trpc.authRouter.loginUser.useMutation();

  return (
    <main>
      <Head>
        <title>Sign In</title>
      </Head>
      <div>
        <button onClick={() => signIn({ email: "test2@test.com", password: "password" })}>Login</button>
      </div>
    </main>
  )
}
