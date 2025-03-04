"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { createClient } from "@/lib/supabase";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
const Login = () => {
  // const supabase = createClient();
  //   const handleLogin = async (formData: FormData) => {
  //     const email = formData.get("email")?.toString();
  //     const password = formData.get("password")?.toString();
  //     if (!email || !password) {
  //       console.error("Email and password are required");
  //       return;
  //     }
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });
  //     if (error) {
  //       console.error("Error signing up:", error);
  //     } else {
  //       console.log("Sign up successful:", data);
  //     }
  //   };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>登录</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>登录</DialogTitle>
          <DialogDescription>
            {/* <form className="flex flex-col min-w-64 max-w-64 mx-auto">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
              />
              <Button formAction={handleLogin}>Sign up</Button>
            </form> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
