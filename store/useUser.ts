import { create } from "zustand"

type UserState = {
    user: any
    setUser: (user: any) => void
}

export const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user: any) => set({ user }),
}))
