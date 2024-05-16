import RoomList from "@/components/game/RoomList"
import React from "react"


function Room() {
    const room_list = [
        { id: "1", delay: 5, latitude: "", longitude: "", nb_players: 2, prompt: "Resaka be" },
        { id: "2", delay: 5, latitude: "", longitude: "", nb_players: 2, prompt: "Resaka be" },
        { id: "3", delay: 5, latitude: "", longitude: "", nb_players: 2, prompt: "Resaka be" },
        { id: "4", delay: 5, latitude: "", longitude: "", nb_players: 2, prompt: "Resaka be" },
    ]
    return (
        <div className="py-6">
            <RoomList room_list={room_list} />
        </div>
    )
}

export default Room
