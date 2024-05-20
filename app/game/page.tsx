"use client"
import BtnCreateRoom from "@/components/game/BtnCreateRoom"
import PlayerProfil from "@/components/game/PlayerProfil"
import PreventSwitch from "@/components/game/PreventSwitch"
import RoomCard from "@/components/game/RoomCard"
import { pusherClient } from "@/lib/pusher"
import { Room } from "@/types/room"
import useResponsive from "@/utils/useResponsive"
import { Skeleton } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const getAllRoom = async () => {
    const res = await fetch("/api/getAllRoom")
    if (!res.ok) {
        throw new Error("Failed to fetch room info")
    }
    const jsonData = await res.json()
    return jsonData
}

// NOTE: StatsDrawer

const StatsDrawer = () => {
    return (
        <div className="drawer drawer-end lg:drawer-open">
            <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                >
                    Stats
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="p-2 space-y-10 bg-base-200 h-screen">
                    <div className="flex items-center gap-5">
                        <h1 className="text-xl">Vos Statistiques</h1>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                            />
                        </svg>
                    </div>
                    <div className="h-[100dvh] overflow-y-auto">
                        <PlayerProfil />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Stats = () => {
    return (
        <div className="p-5 space-y-10">
            <div className="flex items-center gap-5">
                <h1 className="text-3xl">Vos Statistiques</h1>
                <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                    />
                </svg>
            </div>
            <div className="h-[80dvh] overflow-y-auto">
                <PlayerProfil />
            </div>
        </div>
    )
}

// NOTE:  Main Component
const Game = () => {
    // const router = useRouter()
    const { isMobile, isTablet } = useResponsive()
    const [allRooms, setAllRooms] = useState<Room[]>([])
    const { isPending: isInitialRoomsPending } = useQuery({
        queryKey: ["allRoom"],
        queryFn: async () => {
            const data: Room[] = await getAllRoom()

            setAllRooms(data)

            return data
        },

        staleTime: 100 * 60 * 60 * 24,
    })

    useEffect(() => {
        const handleNewRoom = (room: Room) => {
            setAllRooms((prevRooms) => {
                if (prevRooms.find((r) => r.id === room.id)) {
                    return prevRooms
                }
                return [room, ...prevRooms]
            })
        }

        pusherClient.subscribe("lobby")

        pusherClient.bind("new-room", handleNewRoom)

        return () => {
            pusherClient.unsubscribe("lobby")
        }
    }, [])

    return (
        <div className="min-h-[100vh] flex flex-col-reverse xl:grid xl:grid-cols-3 gap-14">
            <PreventSwitch />
            <div className="xl:col-span-2 p-5 space-y-10">
                <div className="flex items-center gap-5">
                    <h1 className="text-3xl text-center">List of room</h1>
                    <svg
                        className="w-10"
                        viewBox="0 0 20 20"
                    >
                        <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <g
                                id="Dribbble-Light-Preview"
                                transform="translate(-140.000000, -4719.000000)"
                                className="fill-current"
                            >
                                <g
                                    id="icons"
                                    transform="translate(56.000000, 160.000000)"
                                >
                                    <path
                                        d="M86,4577 L102,4577 L102,4569 L86,4569 L86,4577 Z M104,4567 L104,4569 L104,4577 L104,4579 L102,4579 L86,4579 L84,4579 L84,4577 L84,4569 L84,4567 L86,4567 L93,4567 L93,4563 L93,4561 L98,4561 L98,4559 L100,4559 L100,4561 L100,4563 L95,4563 L95,4567 L102,4567 L104,4567 Z M98,4574 L100,4574 L100,4572 L98,4572 L98,4574 Z M95,4574 C95.552,4574 96,4573.552 96,4573 C96,4572.448 95.552,4572 95,4572 C94.448,4572 94,4572.448 94,4573 C94,4573.552 94.448,4574 95,4574 L95,4574 Z M88,4572 L89,4572 L89,4571 L91,4571 L91,4572 L92,4572 L92,4574 L91,4574 L91,4575 L89,4575 L89,4574 L88,4574 L88,4572 Z"
                                        id="game_controller-[#796]"
                                    ></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="space-y-5">
                    <BtnCreateRoom />
                    <div className="flex flex-wrap md:grid md:grid-cols-2 gap-4">
                        {isInitialRoomsPending ? (
                            <>
                                <Skeleton className="rounded-lg w-full h-44" />
                                <Skeleton className="rounded-lg w-full h-44" />
                                <Skeleton className="rounded-lg w-full h-44" />
                                <Skeleton className="rounded-lg w-full h-44" />
                            </>
                        ) : (
                            allRooms.map((room: Room) => {
                                return (
                                    <RoomCard
                                        room={room}
                                        key={room.id}
                                    />
                                )
                            })
                        )}
                        {allRooms.length == 0 && !isInitialRoomsPending && <div className="text-center text-current/50 my-5 text-xl">No room available yet !</div>}
                    </div>
                </div>
            </div>
            {isMobile || isTablet ? <StatsDrawer /> : <Stats />}
        </div>
    )
}

export default Game
