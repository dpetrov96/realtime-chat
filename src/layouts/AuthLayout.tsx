const AuthLayout = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <main className="flex w-full items-center justify-center min-h-screen">
    <div style={{ width: 400 }} className="border border-gray-100 mx-auto p-10 shadow-md rounded-md">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {title}
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {children}
      </div>
    </div>
  </main>
)

export default AuthLayout;

