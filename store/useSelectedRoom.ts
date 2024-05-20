import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SelectedRoomState = {
    selectedRoom: string | null
    setSelectedRoom: (selectedRoom: string | null) => void
}

const useSelectedRoom = create<SelectedRoomState>()(
    persist(
        (set) => ({
            selectedRoom: null,
            setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
        }),
        {
            name: "selected-room",
        }
    )
)

export default useSelectedRoom
