import React from "react"

interface Room {
    id: string
    delay: number
    latitude: string
    longitude: string
    nb_players: number
    prompt: string
}

interface Props {
    room_list: Room[]
}

function RoomList({ room_list }: Props) {
    return (
        <div className="min-h-[100vh] grid grid-cols-3">
            <div className="col-span-2 bg-gray-200">
                List of room
                {room_list.map((room: Room) => (
                    <div key={room.id}>room : {room.id}</div>
                ))}
            </div>
            <div className="bg-blue-200">Trouver room</div>
        </div>
    )
}

export default RoomList
