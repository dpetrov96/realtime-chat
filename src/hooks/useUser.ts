import { useSession } from "next-auth/react";

interface User {
  id: string;
  email: string;
}

const useUser = () => {
  const { data: session } = useSession();

  const user = session?.user;

  return user as User | undefined; // Used to avoid next-auth limitations
};

export default useUser;
