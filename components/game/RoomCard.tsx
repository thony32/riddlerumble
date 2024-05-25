import { Button } from "@nextui-org/button"
import { Avatar, AvatarGroup, Card, Chip } from "@nextui-org/react"
import { useUser } from "@/store/useUser"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { Room } from "@/types/room"
import dynamic from "next/dynamic"
const UsersSVG = dynamic(() => import("../misc/UsersSVG"))
const SvgHighLevel = dynamic(() => import("../misc/SvgHighLevel"))
const SvgLowLevel = dynamic(() => import("../misc/SvgLowLevel"))
const SvgLocked = dynamic(() => import("../misc/SvgLocked"))
import useSelectedRoom from "@/store/useSelectedRoom"
import { MAX_PLAYERS } from "@/utils/constants"
import { updateRoom } from "@/services/game-service"
import getUsersPseudo from "@/utils/getUsersPseudo"
import { socket_update } from "@/lib/socket-io"
import toast from "react-hot-toast"

/**
 * Card component for displaying room details
 * @param {Object} props - Props for the component
 * @param {Room} props.room - Room object containing room details
 */
function RoomCard({ room }: { room: Room }) {

    const user = useUser((state) => state.user!)// Get user data from store

    const selectedRoom = useSelectedRoom((state) => state.selectedRoom)  // Get selected room from store

    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom) // Setter function for selected room

    const [action, setAction] = useState<"join" | "leave">("join")  // State for join/leave action

    const updateRoomMutation = useMutation({
        // Mutation for updating room data
        mutationKey: ["updateRoom"],
        mutationFn: async ({ room, given_action }: { room: Room; given_action: "join" | "leave" }) => {

            // If action is join, add user to room
            if (given_action == "join") {

                room.user_pseudo += ", " + user.pseudo! // Concatenate user pseudonym to room

            } else {

                // If action is leave, remove user from room
                room.user_pseudo = getUsersPseudo(room.user_pseudo)
                    .filter((p) => p !== user.pseudo!)
                    .join(", ")
            }
            return await updateRoom(room)
        },
        onError: () => {
            toast.error("Failed to update the room. Please try again.")
        },
        onSuccess: () => {
            // Success handler for mutation
            socket_update.emit("room-update") // Emit socket event for room update

            if (action == "join") {
                setSelectedRoom(room.id) // Set selected room to current room
            } else {
                setSelectedRoom(null)
            }
        },
    })

    /**
     * Click handler for join/leave button
     * @param {Room} room - Room object
     * @param {string} given_action - Action (join/leave)
     */
    const handleClick = (room: Room, given_action: "join" | "leave") => {
        setAction(given_action)
        updateRoomMutation.mutate({ room, given_action }) // Trigger mutation
    }

    // Render room card component
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
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                {
                                    getUsersPseudo(room.user_pseudo).map((pseudo, index) => (
                                        <Chip key={index} color="primary">{pseudo}</Chip>
                                    ))
                                }
                            </div>
                            <span>
                                {getUsersPseudo(room.user_pseudo).length} / {MAX_PLAYERS}
                            </span>
                        </div>
                    </div>
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        {!selectedRoom ? (
                            <Button size="lg" variant="shadow" color="primary" isLoading={updateRoomMutation.isPending} onClick={() => handleClick(room, "join")}>
                                Join
                            </Button>
                        ) : room.id != selectedRoom || getUsersPseudo(room.user_pseudo).length == MAX_PLAYERS ? (
                            <SvgLocked />
                        ) : (
                            <Button size="lg" variant="shadow" isLoading={updateRoomMutation.isPending} onClick={() => handleClick(room, "leave")}>
                                Leave
                            </Button>
                        )}
                    </div>
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
