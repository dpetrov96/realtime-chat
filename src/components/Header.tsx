import { useState } from "react";
import { signOut } from "next-auth/react";

import { useUser } from "@/hooks";
import Button from "./Button";
import Avatar from "react-avatar";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useUser();

  return (
    <div className="fixed top-0 left-0 w-full z-10 flex items-center justify-between border-b-2 bg-white px-5 py-2">
      <div className="text-2xl font-semibold">RealTime Chat</div>
      <div className="relative">
        <Avatar
          size="40"
          name={sessionUser?.email}
          round
          className="cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        />
        {showMenu && (
          <div className="l-0 absolute grid w-[200px] -translate-x-full gap-4 rounded-bl-lg rounded-br-xl rounded-tl-lg border bg-white p-4 shadow-lg">
            <div className="flex justify-center text-sm">
              <span>{sessionUser?.email}</span>
            </div>
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
