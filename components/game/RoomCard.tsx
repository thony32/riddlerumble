/* eslint-disable react-hooks/exhaustive-deps */
// RoomCard.tsx

import { Button } from "@nextui-org/button"
import { Card, Chip } from "@nextui-org/react"
import { useUser } from "@/store/useUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { pusherClient } from "@/lib/pusher"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { Room } from "@/types/room"
import dynamic from "next/dynamic"
const UsersSVG = dynamic(() => import("../misc/UsersSVG"))
const SvgHighLevel = dynamic(() => import("../misc/SvgHighLevel"))
const SvgLowLevel = dynamic(() => import("../misc/SvgLowLevel"))
import useSelectedRoom from "@/store/useSelectedRoom"
import { MAX_PLAYERS } from "@/utils/constants"
import { useRoomCountdown } from "@/store/useRoomCountdown"
import { leaveRoom, joinRoom, setJoker } from "@/services/game-service"

function RoomCard({ room }: { room: Room }) {
    const user = useUser((state) => state.user)
    const selectedRoom = useSelectedRoom((state) => state.selectedRoom)
    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom)
    // const [room, setRoom] = useState<Room>(room)
    const [action, setAction] = useState<"join" | "leave">("join")
    const setCountdown = useRoomCountdown((state) => state.setRoomCountdown)
    const updateRoomMutation = useMutation({
        mutationKey: ["updateRoom"],
        mutationFn: async ({ room, given_action }: { room: Room; given_action: "join" | "leave" }) => {
            if (given_action == "join") return await joinRoom(room, user?.pseudo || "")
            else return await leaveRoom(room, user?.pseudo || "")
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

    const queryClient = useQueryClient()

    const setJokerMutation = useMutation({
        mutationKey: ["createPlayerStat"],
        mutationFn: async () => {
            return await setJoker(room.id, room.user_pseudo)
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log("Joker set created successfully! ", data)
        },
    })

    const handleJoinRoom = useCallback(
        ({ id, nb_players, user_pseudo }: { id: string; nb_players: number; user_pseudo: string }) => {
            if (id == room.id) {
                queryClient.setQueryData(["allRooms"], (oldRooms: Room[]) => oldRooms.map((r) => (r.id === id ? { ...r, nb_players, user_pseudo } : r)))
                if (user_pseudo.split(", ").includes(user?.pseudo || "")) {
                    setSelectedRoom(id)
                    if (user_pseudo.split(', ').filter(Boolean).length == MAX_PLAYERS) {
                        setJokerMutation.mutate()
                        setCountdown(5)
                        // queryClient.setQueryData(["allRooms"], (oldRooms: Room[]) => oldRooms.filter((r) => r.id !== id))
                    }
                } else {
                    setSelectedRoom(selectedRoom === id ? null : selectedRoom)
                    if (user_pseudo.split(', ').filter(Boolean).length == MAX_PLAYERS) {
                        // queryClient.setQueryData(["allRooms"], (oldRooms: Room[]) => oldRooms.filter((r) => r.id !== id))
                    }
                }
            }
        },
        [room, queryClient, setCountdown, user, selectedRoom, setSelectedRoom]
    )

    const handleClick = (room: Room, given_action: "join" | "leave") => {
        setAction(given_action)
        updateRoomMutation.mutate({ room, given_action })
    }

    useEffect(() => {
        pusherClient.subscribe(room.id)

        pusherClient.bind("join-room", handleJoinRoom)

        return () => {
            pusherClient.unsubscribe(room.id)
        }
    }, [room, handleJoinRoom])

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
                                {room.user_pseudo.split(', ').filter(Boolean).length} / {MAX_PLAYERS}
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
