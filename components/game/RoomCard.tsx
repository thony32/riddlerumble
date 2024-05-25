/* eslint-disable react-hooks/exhaustive-deps */
// RoomCard.tsx

import { Button } from "@nextui-org/button"
import { Card, Chip } from "@nextui-org/react"
import { useUser } from "@/store/useUser"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { Room } from "@/types/room"
import dynamic from "next/dynamic"
const UsersSVG = dynamic(() => import("../misc/UsersSVG"))
const SvgHighLevel = dynamic(() => import("../misc/SvgHighLevel"))
const SvgLowLevel = dynamic(() => import("../misc/SvgLowLevel"))
const SvgLocked = dynamic(() => import("../misc/SvgLocked"))
import useSelectedRoom from "@/store/useSelectedRoom"
import { MAX_PLAYERS } from "@/utils/constants"
import { updateRoom } from "@/services/game-service"
import getUsersPseudo from "@/utils/getUsersPseudo"
import { socket_update } from "@/lib/socket-io"

function RoomCard({ room }: { room: Room }) {
    const user = useUser((state) => state.user)
    const selectedRoom = useSelectedRoom((state) => state.selectedRoom)
    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom)
    const [action, setAction] = useState<"join" | "leave">("join")
    const updateRoomMutation = useMutation({
        mutationKey: ["updateRoom"],
        mutationFn: async ({ room, given_action }: { room: Room; given_action: "join" | "leave" }) => {
            if (given_action == "join") {
                room.user_pseudo += ", " + user.pseudo
            } else {
                room.user_pseudo = getUsersPseudo(room.user_pseudo)
                    .filter((p) => p !== user.pseudo)
                    .join(", ")
            }
            return await updateRoom(room)
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: () => {
            socket_update.emit("room-update")
            if (action == "join") {
                setSelectedRoom(room.id)
            } else {
                setSelectedRoom(null)
            }
        },
    })

    const handleClick = (room: Room, given_action: "join" | "leave") => {
        setAction(given_action)
        updateRoomMutation.mutate({ room, given_action })
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex relative">
            <Card key={room.id} className="w-full group">
                <div className="w-full top-0 left-0 absolute bg-[url('/images/room-map.png')] bg-cover bg-center h-full opacity-45 group-hover:opacity-100 duration-700 ease-soft-spring" />
                <div className="relative justify-end items-center gap-52 flex text-white p-7 w-full bg-gradient-to-r from-transparent to-black">
                    <div className="w-full">
                        <h1 className="text-xl xl:text-3xl flex items-center text-nowrap gap-3 font-extrabold [text-shadow:_1px_3px_5px_rgba(0,0,0,1)]">
                            {room.level == "high-level" ? (
                                <>
                                    <SvgHighLevel />
                                    High Level
                                </>
                            ) : (
                                <>
                                    <SvgLowLevel />
                                    Normal Level
                                </>
                            )}
                        </h1>
                        <div className="flex gap-3 text-3xl items-center">
                            <UsersSVG className="size-16" />{" "}
                            <span>
                                {getUsersPseudo(room.user_pseudo).length} / {MAX_PLAYERS}
                            </span>
                        </div>
                    </div>
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        {!selectedRoom ? (
                            <Button size="lg" variant="shadow" color="primary" isLoading={updateRoomMutation.isPending} onClick={() => handleClick(room, "join")}>
                                Join
                            </Button>
                        ) : room.id != selectedRoom || getUsersPseudo(room.user_pseudo).length == MAX_PLAYERS ? (
                            <SvgLocked />
                        ) : (
                            <Button size="lg" variant="shadow" isLoading={updateRoomMutation.isPending} onClick={() => handleClick(room, "leave")}>
                                Leave
                            </Button>
                        )}
                    </div>
                </div>

                <Chip variant="faded" color="primary" className="absolute top-1 left-1" size="sm">
                    {formatDistanceToNow(new Date(room.created_at || new Date()), { includeSeconds: true, addSuffix: true })}
                </Chip>

                <div className="absolute bottom-1 right-4 text-white text-xs flex gap-2 items-center">
                    <span>ID {room.id}</span>
                </div>
            </Card>
        </motion.div>
    )
}

export default RoomCard
