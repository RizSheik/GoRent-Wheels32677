"use client";

import { MdSwitchAccount } from "react-icons/md";
import SideBarCartIcon from "./SideBarCartIcon";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react"; // ✅ Correct import
import type { Session } from "next-auth"; // ✅ Correct import for `Session`
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      const userSession = await getSession();
      setSession(userSession);
    };
    fetchUserSession();
  }, []);

  return (
    <div className="fixed top-60 right-2 z-20 flex flex-col gap-2">
      <Link
        href={session?.user ? "/dashboard" : "/signin"}
        className="bg-accentWhite w-16 h-[70px] rounded-md flex flex-col gap-1 text-accent justify-center items-center shadow-sm shadow-lightGreen overflow-hidden group cursor-pointer"
      >
        <div className="flex justify-center items-center">
          {session?.user ? (
            <Image
              src={session.user.image ?? "/default-profile.png"} // ✅ Fallback image
              alt="User Image"
              width={35}
              height={35}
              className="rounded-full transition-transform duration-200 group-hover:translate-x-4"
            />
          ) : (
            <MdSwitchAccount className="text-2xl transition-transform duration-200 group-hover:translate-x-3" />
          )}
        </div>
        <p className="text-xs font-semibold">{session?.user ? "Profile" : "Sign In"}</p>
      </Link>
      <SideBarCartIcon />
    </div>
  );
};

export default SideBar;