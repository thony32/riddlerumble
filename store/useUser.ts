import { create } from "zustand"

export type User = {
    id: string | null
    email: string | null
    full_name: string | null
    nationality: string | null
    pseudo: string | null
    avatar: string | null
    score: number | null
} | null

type UserState = {
    user: any
    setUser: (user: User) => void
}

export const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
}))
