"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "@supabase/supabase-js";
const image = "https://github.com/shadcn.png";

const AvatarComponent = ({ session }: { session: Session }) => {
  const src = session?.user?.user_metadata?.avatar_url || image;
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
