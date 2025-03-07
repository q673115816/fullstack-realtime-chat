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
import { useState } from "react";
import { SocialLayout, ThemeSupa, ViewType } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@/lib/supabase/client";
// import styles from "./style.module.css";

// const classes: { [key: string]: string } = {
//   "rgb(202, 37, 37)": styles["container-redshadow"],
//   "rgb(65, 163, 35)": styles["container-greenshadow"],
//   "rgb(8, 107, 177)": styles["container-blueshadow"],
//   "rgb(235, 115, 29)": styles["container-orangeshadow"],
// };

const socialAlignments = ["horizontal", "vertical"] as const;

const views: { id: ViewType; title: string }[] = [
  { id: "sign_in", title: "Sign In" },
  { id: "sign_up", title: "Sign Up" },
  { id: "magic_link", title: "Magic Link" },
  { id: "forgotten_password", title: "Forgotten Password" },
  { id: "update_password", title: "Update Password" },
  { id: "verify_otp", title: "Verify Otp" },
];

const Login = () => {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [socialLayout] = useState<SocialLayout>(
    socialAlignments[1] satisfies SocialLayout
  );
  const [view] = useState(views[0]);
  // const handleSignIn = () => {
  //   handleClose();
  //   window.location.reload();
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>登录</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Auth
          supabaseClient={supabase}
          view={view.id}
          appearance={{
            theme: ThemeSupa,
            // style: {
            //   button: {
            //     borderRadius: borderRadius,
            //     borderColor: "rgba(0,0,0,0)",
            //   },
            // },
            // variables: {
            //   default: {
            //     colors: {
            //       brand: brandColor,
            //       brandAccent: `gray`,
            //     },
            //   },
            // },
          }}
          providers={[
            // "apple",
            "google",
            "github",
          ]}
          socialLayout={socialLayout}
          redirectTo={`${location.origin}/auth/callback`}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Login;
