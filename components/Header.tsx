import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  return (
    <div className={cn("border-b bg-white flex justify-between items-center px-4 py-2")}>
      <h1>Random Chat</h1>
      <Button>登录</Button>
      {/* <div className="flex justify-between items-center mb-4">
        <span>{session ? `欢迎, ${session.user.email}` : "游客模式"}</span>
        {session ? (
          <Button onClick={() => signOut()} variant="outline">
            退出
          </Button>
        ) : (
          <Button onClick={() => signIn("github")}>登录</Button>
        )}
      </div> */}
    </div>
  );
};

export default Header;
