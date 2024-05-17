import { Button } from "@nextui-org/button"
import { Card } from "@nextui-org/react"
import UsersSVG from "./UsersSVG"
import Link from "next/link"
import React from "react"
import BtnCreateRoom from "./BtnCreateRoom"

interface Room {
    id: string
    delay: number
    latitude: string
    longitude: string
    nb_players: number
    prompt: string
    user_pseudo: string
}

interface Props {
    room_list: Room[]
}

const update_room = async (room: Room, pseudo: string) => {
    const response = await fetch("/api/updateRoom", {
        body: JSON.stringify({ ...room, nb_players: room.nb_players + 1, user_pseudo: `${room.user_pseudo}, ${pseudo}` }),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) {
        throw new Error("Failed to join the room")
    }

    const data = await response.json()
    return data
}

function RoomList({ room_list }: Props) {
    return (
        <div className="min-h-[100vh] grid grid-cols-3">
            <div className="col-span-2 p-5 space-y-10">
                <h1 className="text-3xl text-center">List of room</h1>

                <div className="flex flex-col items-center w-full gap-4">
                    <BtnCreateRoom />
                    {room_list.map((room: Room) => (
                        <Card
                            key={room.id}
                            className="max-w-5xl"
                        >
                            <div className="w-full top-0 left-0 absolute bg-[url('/images/room-map.png')] bg-cover bg-center h-full" />
                            <div className="relative justify-end items-center gap-52 flex text-white p-7 w-full bg-gradient-to-r from-transparent to-black">
                                <h1 className="text-3xl font-extrabold [text-shadow:_1px_3px_5px_rgba(0,0,0,1)]">{room.delay > 3 ? "Match Normal" : "Match Rapide"}</h1>
                                <div className="flex gap-3 text-3xl items-center">
                                    <UsersSVG className="size-16" /> <span>{room.nb_players} / 4</span>
                                </div>
                                <Button
                                    size="lg"
                                    variant="shadow"
                                    color="primary"
                                >
                                    Join
                                </Button>
                            </div>
                            <p className="absolute bottom-1 right-4 text-white text-xs">ID {room.id}</p>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="p-5 space-y-10">
                <h1 className="text-3xl text-center">Vos Statistiques</h1>
            </div>
        </div>
    )
}

export default RoomList
