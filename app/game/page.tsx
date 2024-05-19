"use client"
import BtnCreateRoom from "@/components/game/BtnCreateRoom"
import PlayerProfil from "@/components/game/PlayerProfil"
import RoomList, { Room } from "@/components/game/RoomList"
import { Skeleton } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"

const getAllRoom = async () => {
    const res = await fetch("/api/getAllRoom")
    if (!res.ok) {
        throw new Error("Failed to fetch room info")
    }
    const jsonData = await res.json()
    return jsonData
}

const Game = () => {
    const router = useRouter()
    const {
        isPending: isAllRoomPending,
        error: allRoomError,
        data: allRoomData,
    } = useQuery({
        queryKey: ["allRoom"],
        queryFn: async () => {
            const data: Room[] = await getAllRoom()

            const roomSelected = data.find((room) => room.nb_players == 4)
            if (roomSelected) {
                router.push(`/game/${roomSelected.id}`)
                return []
            }

            return data
        },
        staleTime: 100 * 60 * 60 * 24,
    })

    return (
        <div className="min-h-[100vh] grid grid-cols-3">
            <div className="col-span-2 p-5 space-y-10">
                <h1 className="text-3xl text-center">List of room</h1>

                <div className="flex flex-col items-center w-full gap-4 max-w-5xl mx-auto">
                    <BtnCreateRoom />
                    {isAllRoomPending ? (
                        <>
                            <Skeleton className="rounded w-full h-28" />
                            <Skeleton className="rounded w-full h-28" />
                            <Skeleton className="rounded w-full h-28" />
                            <Skeleton className="rounded w-full h-28" />
                            <Skeleton className="rounded w-full h-28" />
                        </>
                    ) : (
                        <RoomList room_list={allRoomData} />
                    )}
                </div>
            </div>
            <div className="p-5 space-y-10">
                <h1 className="text-3xl text-center">Vos Statistiques</h1>
                <div className="h-[80dvh] overflow-y-auto">
                    <PlayerProfil />
                </div>
            </div>
        </div>
    )
}

export default Game
