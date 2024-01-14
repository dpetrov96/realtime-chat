import Head from 'next/head'

import { trpc } from '@/utils/trpc'

export default function Home() {
  const { mutateAsync: loginUser } = trpc.authRouter.loginUser.useMutation();
  const { mutateAsync: createUser } = trpc.authRouter.createUser.useMutation();

  return (
    <main>
      <Head>
        <title>Realtime chat</title>
      </Head>
      <div>
        <button onClick={() => createUser({ username: "test2", email: "test2@test.com", password: "password" })}>Register</button>
        <button onClick={() => loginUser({ email: "test2@test.com", password: "password" })}>Login</button>
      </div>
    </main>
  )
}
