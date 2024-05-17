import { useUser } from "@/store/useUser"
import { Button } from "@nextui-org/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"

const create_room = async (level: string, pseudo: string) => {
    const response = await fetch("/api/createRoom", {
        body: JSON.stringify({ level, user_pseudo: pseudo }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to create room")
    return await response.json()
}

function BtnCreateRoom() {
    const user = useUser((state) => state.user)
    const queryClient = useQueryClient()
    const createRoomMutation = useMutation({
        mutationKey: ["createRoom"],
        mutationFn: async (level: string) => {
            return await create_room(level, user?.pseudo || "")
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log("Room created successfully! ", data)
            queryClient.invalidateQueries({ queryKey: ["allRoom"], exact: true, refetchType: "active" })
        },
    })
    return (
        <div className="grid grid-cols-2 w-full gap-4">
            <Button
                size="lg"
                onClick={() => createRoomMutation.mutate("")}
                className="py-10"
                color="warning"
            >
                Create Low Level Room
            </Button>
            <Button
                size="lg"
                onClick={() => createRoomMutation.mutate("high-level")}
                className="py-10"
                color="danger"
            >
                Create High Level Room
            </Button>
        </div>
    )
}

export default BtnCreateRoom
