// RoomCard.tsx

import { Button } from "@nextui-org/button"
import { Card, Chip } from "@nextui-org/react"
import { useUser } from "@/store/useUser"
import { useMutation } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
// import { io, Socket } from "socket.io-client"
import { pusherClient } from "@/lib/pusher"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { Room } from "@/types/room"
import UsersSVG from "../misc/UsersSVG"
import SvgHighLevel from "../misc/SvgHighLevel"
import SvgLowLevel from "../misc/SvgLowLevel"
import useSelectedRoom from "@/store/useSelectedRoom"
import { MAX_PLAYERS } from "@/utils/constants"

const update_room = async (room: Room, pseudo: string) => {
    const nbPlayersInt32 = room.nb_players + 1

    const response = await fetch("/api/updateRoom", {
        body: JSON.stringify({ ...room, nb_players: nbPlayersInt32, user_pseudo: `${room.user_pseudo}, ${pseudo}` }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
        throw new Error("Failed to join the room")
    }

    const data = await response.json()
    return data
}

const leave_room = async (room: Room, pseudo: string) => {
    const nbPlayersInt32 = room.nb_players - 1
    const user_pseudo = room.user_pseudo
        .split(", ")
        .filter((p) => p !== pseudo)
        .join(", ")

    const response = await fetch("/api/updateRoom", {
        body: JSON.stringify({ ...room, nb_players: nbPlayersInt32, user_pseudo }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
        throw new Error("Failed to leave the room")
    }

    const data = await response.json()
    return data
}

function RoomCard({ room: room_props }: { room: Room }) {
    const router = useRouter()
    const user = useUser((state) => state.user)
    const selectedRoom = useSelectedRoom((state) => state.selectedRoom)
    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom)
    const [room, setRoom] = useState<Room>(room_props)
    const [action, setAction] = useState<"join" | "leave">("join")
    const [countdown, setCountdown] = useState<number | null>(null)
    const updateRoomMutation = useMutation({
        mutationKey: ["updateRoom"],
        mutationFn: async ({ room, given_action }: { room: Room; given_action: "join" | "leave" }) => {
            if (given_action == "join") return await update_room(room, user?.pseudo || "")
            else return await leave_room(room, user?.pseudo || "")
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: () => {
            if (action == "join") {
                setSelectedRoom(room.id)
            } else {
                setSelectedRoom(null)
            }
        },
    })

    const handleJoinRoom = useCallback(
        ({ id, nb_players, user_pseudo }: { id: string; nb_players: number; user_pseudo: string }) => {
            if (id == room_props.id) {
                setRoom((prevRoom) => ({ ...prevRoom, nb_players, user_pseudo }))
                if (nb_players == MAX_PLAYERS) {
                    setCountdown(5)
                }
            }
        },
        [room_props]
    )

    const handleClick = (room: Room, given_action: "join" | "leave") => {
        setAction(given_action)
        updateRoomMutation.mutate({ room, given_action })
    }

    useEffect(() => {
        pusherClient.subscribe(room_props.id)

        pusherClient.bind("join-room", handleJoinRoom)

        return () => {
            pusherClient.unsubscribe(room_props.id)
        }
    }, [room_props, handleJoinRoom])

    // const [socket, setSocket] = useState<Socket | null>(null)
    // useEffect(() => {
    //     const wsProtocol = process.env.NODE_ENV === "production" ? "wss" : "ws"
    //     const wsHost = process.env.NODE_ENV === "production" ? "riddlerumble.vercel.app" : "localhost"
    //     const wsPort = process.env.NODE_ENV === "production" ? "443" : "8080"
    //     const socketUrl = `${wsProtocol}://${wsHost}${process.env.NODE_ENV === "production" ? "" : `:${wsPort}`}`

    //     const socket = io(socketUrl)

    //     socket.on("connect", () => {
    //         console.log("WebSocket connected")
    //         setSocket(socket)
    //         socket.emit("subscribe", room_props.id)
    //     })

    //     socket.on("join-room", ({ id, nb_players, user_pseudo }: { id: string; nb_players: number; user_pseudo: string }) => {
    //         if (id === room_props.id) {
    //             setRoom((prevRoom) => ({ ...prevRoom, nb_players, user_pseudo }))
    //         }
    //     })

    //     socket.on("disconnect", () => {
    //         console.log("WebSocket disconnected")
    //     })

    //     return () => {
    //         socket.disconnect()
    //     }
    // }, [room_props])

    useEffect(() => {
        if (countdown !== null) {
            if (countdown > 0) {
                const timer = setTimeout(() => {
                    setCountdown((prev) => (prev !== null ? prev - 1 : null))
                }, 1000)
                return () => clearTimeout(timer)
            } else {
                router.push(`/game/${room_props.id}`)
            }
        }
    }, [selectedRoom, router, room_props, countdown])

    return (
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="w-full flex relative">
            {/* COUNTDOWN */}
            <AnimatePresence>
                {countdown !== null && (
                    <div className="fixed z-50 inset-0 w-dvw h-dvh grid place-items-center backdrop-blur-sm">
                        <motion.span
                            key={countdown}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-[70dvh]"
                        >
                            {countdown == 0 ? "GO!" : countdown}
                        </motion.span>
                    </div>
                )}
            </AnimatePresence>
            <Card key={room.id} className="w-full group">
                <div className="w-full top-0 left-0 absolute bg-[url('/images/room-map.png')] bg-cover bg-center h-full opacity-45 group-hover:opacity-100 duration-700 ease-soft-spring" />
                <div className="relative justify-end items-center gap-52 flex text-white p-7 w-full bg-gradient-to-r from-transparent to-black">
                    <div className="w-full">
                        <h1 className="text-3xl flex items-center text-nowrap gap-3 font-extrabold [text-shadow:_1px_3px_5px_rgba(0,0,0,1)]">
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
                                {room.nb_players} / {MAX_PLAYERS}
                            </span>
                        </div>
                    </div>
                    {!selectedRoom ? (
                        <Button size="lg" variant="shadow" color="primary" isLoading={updateRoomMutation.isPending} onClick={() => handleClick(room, "join")}>
                            Join
                        </Button>
                    ) : room.id == selectedRoom ? (
                        <Button size="lg" variant="shadow" isLoading={updateRoomMutation.isPending} onClick={() => handleClick(room, "leave")}>
                            Leave
                        </Button>
                    ) : (
                        <span className="w-20" />
                    )}
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
