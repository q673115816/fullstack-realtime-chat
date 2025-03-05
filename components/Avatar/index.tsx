"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";
const image = "https://github.com/shadcn.png";

const AvatarComponent = ({
  src = image,
}: {
  src: User["user_metadata"]["avatar_url"];
}) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
