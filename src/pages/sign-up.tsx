import Head from 'next/head'

import { trpc } from '@/utils/trpc'

export default function SignUp() {
  const { mutateAsync: signUp } = trpc.authRouter.createUser.useMutation();

  return (
    <main>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div>
      </div>
    </main>
  )
}
