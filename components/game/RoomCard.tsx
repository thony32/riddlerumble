import { Button } from "@nextui-org/button"
import { Card } from "@nextui-org/react"
import UsersSVG from "../Misc/UsersSVG"
import { useUser } from "@/store/useUser"
import { useMutation } from "@tanstack/react-query"
import SvgHighLevel from "../Misc/SvgHighLevel"
import SvgLowLevel from "../Misc/SvgLowLevel"
import { FacebookMessengerShareButton } from "react-share"
import { useCallback, useEffect, useState } from "react"
import { pusherClient } from "@/lib/pusher"
import { useRouter } from "next/navigation"

export interface Room {
    id: string
    delay: number
    latitude: string
    longitude: string
    level: string
    nb_players: number
    prompt: string
    user_pseudo: string
}

const roomLink = process.env.NODE_ENV === "production" ? "https://enigmap.vercel.app" : "http://localhost:3000"

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
    const [room, setRoom] = useState<Room>(room_props)
    const updateRoomMutation = useMutation({
        mutationKey: ["updateRoom"],
        mutationFn: async ({ room, action }: { room: Room; action: "join" | "leave" }) => {
            if (action == "join") return await update_room(room, user?.pseudo || "")
            else return await leave_room(room, user?.pseudo || "")
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: ({ result }) => {
            console.log("Room updated successfully! ", result)
        },
    })

    const handleJoinRoom = useCallback(
        ({ id, nb_players, user_pseudo }: { id: string; nb_players: number; user_pseudo: string }) => {
            if (id == room_props.id) {
                setRoom((prevRoom) => ({ ...prevRoom, nb_players, user_pseudo }))
                if (nb_players == 3) {
                    router.push(`/game/${room_props.id}`)
                }
            }
        },
        [room_props, router]
    )

    useEffect(() => {
        pusherClient.subscribe(room_props.id)

        pusherClient.bind("join-room", handleJoinRoom)

        return () => {
            pusherClient.unsubscribe(room_props.id)
        }
    }, [room_props, handleJoinRoom])

    return (
        <Card
            key={room.id}
            className="w-full group"
        >
            <div className="w-full top-0 left-0 absolute bg-[url('/images/room-map.png')] bg-cover bg-center h-full opacity-45 group-hover:opacity-100 duration-700 ease-soft-spring" />
            <div className="relative justify-end items-center gap-52 flex text-white p-7 w-full bg-gradient-to-r from-transparent to-black">
                <div>
                    <h1 className="text-3xl flex items-center gap-3 font-extrabold [text-shadow:_1px_3px_5px_rgba(0,0,0,1)]">
                        {room.level == "high-level" ? (
                            <>
                                <SvgHighLevel />
                                High Level
                            </>
                        ) : (
                            <>
                                <SvgLowLevel />
                                Low Level
                            </>
                        )}
                    </h1>
                    <div className="flex gap-3 text-3xl items-center">
                        <UsersSVG className="size-16" /> <span>{room.nb_players} / 4</span>
                    </div>
                </div>
                {!room.user_pseudo.split(", ").includes(user?.pseudo!, 0) ? (
                    <Button
                        size="lg"
                        variant="shadow"
                        color="primary"
                        isLoading={updateRoomMutation.isPending}
                        onClick={() => updateRoomMutation.mutate({ room, action: "join" })}
                    >
                        Join
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        variant="shadow"
                        isLoading={updateRoomMutation.isPending}
                        onClick={() => updateRoomMutation.mutate({ room, action: "leave" })}
                    >
                        Leave
                    </Button>
                )}
            </div>

            <div className="absolute bottom-1 right-4 text-white text-xs flex gap-2 items-center">
                <span>ID {room.id}</span>
                <FacebookMessengerShareButton
                    appId={room.id}
                    url={`${roomLink}/game/${room.id}`}
                >
                    <svg
                        className="w-4 fill-current mb-1 hover:scale-125 duration-150 ease-soft-spring"
                        viewBox="0 0 24 24"
                    >
                        <path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.389 0 01.002 11.64zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z" />
                    </svg>
                </FacebookMessengerShareButton>
            </div>
        </Card>
    )
}

export default RoomCard
