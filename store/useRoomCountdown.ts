import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type RoomCountdownState = {
    roomCountdown: number | null
    setRoomCountdown: (roomCountdown: number | null) => void
}

export const useRoomCountdown = create<RoomCountdownState>((set) => ({
    roomCountdown: null,
    setRoomCountdown: (roomCountdown) => set({ roomCountdown }),
}))
