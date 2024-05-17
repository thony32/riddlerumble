import { useUser } from "@/store/useUser"
import { Button } from "@nextui-org/button"
import { useMutation } from "@tanstack/react-query"
import { error } from "console"
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
        },
    })
    return (
        <div className="grid grid-cols-2">
            <Button onClick={() => createRoomMutation.mutate("")}>Create Low Level Room</Button>
            <Button onClick={() => createRoomMutation.mutate("high-level")}>Create High Level Room</Button>
        </div>
    )
}

export default BtnCreateRoom
