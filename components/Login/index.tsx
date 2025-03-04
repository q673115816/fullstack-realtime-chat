"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInAction, signUpAction } from "@/actions";
const Login = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>登录</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter className="">
            <Button type="submit" formAction={signInAction}>
              Sign In
            </Button>
            <Button type="submit" variant={"outline"} formAction={signUpAction}>
              Sign Up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
