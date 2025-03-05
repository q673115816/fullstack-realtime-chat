import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export const signUpAction = (callback: () => void) => async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const supabase = createClient();
    if (!email || !password) {
        console.error("Email and password are required");
        return;
    }
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        console.error("Error signing up:", error);
        toast.error("注册失败", {
            description: error.message,
        });
    } else {
        console.log("Sign up successful:", data);
        toast.success("注册成功", {
            description: '请确认邮箱',
        });
        callback?.();
    }
};

export const signInAction = (callback: () => void) => async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        console.error("Error signing in:", error);
        toast.error("登录失败", {
            description: error.message,
        });
    } else {
        console.log("Sign in successful:", data);
        toast.success("登录成功");
        callback?.();
    }
};

export const signOutAction = (callback?: () => void) => async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error signing out:", error);
    } else {
        console.log("Sign out successful");
        toast.success("退出成功");
        callback?.();
    }
};