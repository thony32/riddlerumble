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
    // const {
    //     isPending: isAllRoomPending,
    //     error: allRoomError,
    //     data: allRoomData,
    // } = useQuery({
    //     queryKey: ["allRoom"],
    //     queryFn: () => getAllRoom(),
    //     staleTime: 100 * 60 * 60 * 24,
    // })

    const room_list = [
        { id: "1", delay: 2, latitude: "", longitude: "", nb_players: 2, prompt: "Resaka be" },
        { id: "2", delay: 5, latitude: "", longitude: "", nb_players: 2, prompt: "Resaka be" },
        { id: "3", delay: 2, latitude: "", longitude: "", nb_players: 2, prompt: "Resaka be" },
        { id: "4", delay: 5, latitude: "", longitude: "", nb_players: 2, prompt: "Resaka be" },
    ]

    return (
        <div className="py-6">
            <RoomList room_list={room_list} />
        </div>
    )
}

export default Game
