import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'

// 定义 store 的状态和方法
interface UserStore {
    user: User | null
    setUser: (user: User | null) => void
    clearUser: () => void
}

// 创建 store
export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage', // localStorage 中的键名
        }
    )
) 