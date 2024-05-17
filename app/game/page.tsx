"use client"
import RoomList from "@/components/game/RoomList"
import { useQuery } from "@tanstack/react-query"
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
    const {
        isPending: isAllRoomPending,
        error: allRoomError,
        data: allRoomData,
    } = useQuery({
        queryKey: ["allRoom"],
        queryFn: () => getAllRoom(),
        staleTime: 100 * 60 * 60 * 24,
    })

    return <div className="py-6">{!isAllRoomPending && <RoomList room_list={allRoomData} />}</div>
}

export default Game
