import { Button } from "@nextui-org/button"
import { Card } from "@nextui-org/react"
import UsersSVG from "./UsersSVG"
import { useUser } from "@/store/useUser"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import SvgHighLevel from "../Misc/SvgHighLevel"
import SvgLowLevel from "../Misc/SvgLowLevel"
import { FacebookMessengerIcon, FacebookMessengerShareButton } from "react-share"

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

interface Props {
    room_list: Room[] | undefined
}

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

function RoomList({ room_list }: Props) {
    const user = useUser((state) => state.user)
    const queryClient = useQueryClient()
    const updateRoomMutation = useMutation({
        mutationKey: ["updateRoom"],
        mutationFn: async (room: Room) => {
            return await update_room(room, user?.pseudo || "")
        },
        onError: (error) => {
            console.log(error)
        },
        onSuccess: ({ result }) => {
            console.log("Room updated successfully! ", result)
            // queryClient.invalidateQueries({ queryKey: ["allRoom"], exact: true, refetchType: "active" })
        },
    })
    return (
        <div className="grid grid-cols-2 gap-4">
            {room_list?.map((room: Room) => (
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
                                onClick={() => updateRoomMutation.mutate(room)}
                            >
                                Join
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                variant="shadow"
                            >
                                Leave
                            </Button>
                        )}
                    </div>

                    <div className="absolute bottom-1 right-4 text-white text-xs flex gap-2 items-center">
                        <span>ID {room.id}</span>
                        <FacebookMessengerShareButton
                            appId={room.id}
                            url={`http://localhost:3000/game/${room.id}`}
                        >
                            {/* TODO: ovay ty icon ty */}
                            <FacebookMessengerIcon size={32} />
                        </FacebookMessengerShareButton>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default RoomList
