import { createClient } from "@/lib/supabase/client";

export const signUpAction = async (formData: FormData) => {
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
    } else {
        console.log("Sign up successful:", data);
    }
};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        console.error("Error signing in:", error);
    } else {
        console.log("Sign in successful:", data);
    }
};