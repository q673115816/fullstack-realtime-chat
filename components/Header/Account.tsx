"use client";
import { User } from "@supabase/supabase-js";
import Avatar from "../Avatar";
import { useUserStore } from "@/store/user";
import { useEffectOnce } from "react-use";
import Menu from "./Menu";

const Account = ({ user }: { user: User }) => {
  const { setUser } = useUserStore();
  useEffectOnce(() => {
    setUser(user);
  });
  return (
    <Menu>
      <div className="flex items-center gap-2">
        <span>{user.email}</span>
        <Avatar src={user.user_metadata.avatar_url} />
      </div>
    </Menu>
  );
};

export default Account;
