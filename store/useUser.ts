import { create } from "zustand"

type User = {
    id: string
    email: string
    full_name: string
    nationality: string
    pseudo: string
    avatar: string | null
    score: number | null
} | null

type UserState = {
    user: User
    setUser: (user: any) => void
}

export const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user: any) => set({ user }),
}))
