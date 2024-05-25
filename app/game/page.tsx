"use client"
import dynamic from "next/dynamic"
import { Room } from "@/types/room"
import { Skeleton } from "@nextui-org/react"
import { useMutation, useQuery } from "@tanstack/react-query"
const BtnCreateRoom = dynamic(() => import("@/components/game/BtnCreateRoom"))
const RoomCard = dynamic(() => import("@/components/game/RoomCard"))
const StatsModal = dynamic(() => import("@/components/game/StatsModal"))
const Stats = dynamic(() => import("@/components/game/Stats"))
import { useEffect, useState } from "react"
import useSelectedRoom from "@/store/useSelectedRoom"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { getAllRoom, setJoker } from "@/services/game-service"
import { socket, socket_update } from "@/lib/socket-io"
import checkIfJoined from "@/utils/checkIfJoined"
import getUsersPseudo from "@/utils/getUsersPseudo"
import { useUser } from "@/store/useUser"
import { MAX_PLAYERS } from "@/utils/constants"
import "intro.js/introjs.css"
import "intro.js/themes/introjs-flattener.css"
import toast from "react-hot-toast"

const PARTY_START_TIME_KEY = "partyStartTime"

const Game = () => {
    const router = useRouter()
    const selectedRoom = useSelectedRoom((state) => state.selectedRoom)
    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom)
    const [countdown, setCountdown] = useState<number | null>(null)
    const user = useUser((state) => state.user)

    const setJokerMutation = useMutation({
        mutationKey: ["setJokerMutation"],
        mutationFn: async (user_pseudo: string) => {
            return await setJoker(selectedRoom as string, user_pseudo)
        },
        onError: (error) => {
            toast.error("Failed to set the joker. Please try again or check the user pseudo.")
        },
    })

    const {
        isPending: isInitialRoomsPending,
        data: allRooms,
        refetch: refetchRooms,
    } = useQuery({
        queryKey: ["allRooms"],
        queryFn: async () => {
            const data: Room[] = await getAllRoom()
            if (data) {
                const findedRoom = data.find((r) => checkIfJoined(getUsersPseudo(r.user_pseudo), user?.pseudo))
                if (!findedRoom) {
                    setSelectedRoom(null)
                } else {
                    setJokerMutation.mutate(findedRoom.user_pseudo)
                    setSelectedRoom(findedRoom.id)
                    if (getUsersPseudo(findedRoom.user_pseudo).length === MAX_PLAYERS) {
                        setCountdown(5)
                    }
                }
            }
            const room_filtered = data.filter((r) => getUsersPseudo(r.user_pseudo).length != MAX_PLAYERS)

            return room_filtered
        },
        staleTime: 100 * 60 * 60 * 24,
    })

    useEffect(() => {
        socket.on("room-created", () => {
            refetchRooms()
        })
    }, [refetchRooms])

    useEffect(() => {
        socket_update.on("room-updated", () => {
            refetchRooms()
        })
    }, [refetchRooms])

    useEffect(() => {
        if (countdown !== null) {
            if (countdown > 0) {
                const timer = setTimeout(() => {
                    setCountdown((prev) => (prev !== null ? prev - 1 : null))
                }, 1000)
                return () => clearTimeout(timer)
            } else {
                localStorage.removeItem(PARTY_START_TIME_KEY)
                router.push(`/game/${selectedRoom}`)
            }
        }
    }, [countdown, router, selectedRoom])

    return (
        <div className="min-h-[100vh] flex flex-col xl:grid xl:grid-cols-3 gap-14">
            {/* COUNTDOWN */}
            <AnimatePresence>
                {countdown !== null && (
                    <div className="fixed z-50 inset-0 w-dvw h-dvh grid place-items-center backdrop-blur-sm">
                        <motion.span
                            key={countdown}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-[50dvh]"
                        >
                            {countdown == 0 ? "GO!" : countdown}
                        </motion.span>
                    </div>
                )}
            </AnimatePresence>
            <div className="xl:col-span-2 p-5 space-y-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <h1 className="text-xl sm:text-3xl text-center">List of room</h1>
                        <svg className="w-6 sm:w-10" viewBox="0 0 20 20">
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -4719.000000)" className="fill-current">
                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                        <path
                                            d="M86,4577 L102,4577 L102,4569 L86,4569 L86,4577 Z M104,4567 L104,4569 L104,4577 L104,4579 L102,4579 L86,4579 L84,4579 L84,4577 L84,4569 L84,4567 L86,4567 L93,4567 L93,4563 L93,4561 L98,4561 L98,4559 L100,4559 L100,4561 L100,4563 L95,4563 L95,4567 L102,4567 L104,4567 Z M98,4574 L100,4574 L100,4572 L98,4572 L98,4574 Z M95,4574 C95.552,4574 96,4573.552 96,4573 C96,4572.448 95.552,4572 95,4572 C94.448,4572 94,4572.448 94,4573 C94,4573.552 94.448,4574 95,4574 L95,4574 Z M88,4572 L89,4572 L89,4571 L91,4571 L91,4572 L92,4572 L92,4574 L91,4574 L91,4575 L89,4575 L89,4574 L88,4574 L88,4572 Z"
                                            id="game_controller-[#796]"
                                        ></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <StatsModal />
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
                            allRooms &&
                            allRooms.map((room: Room, index: number) => {
                                return <RoomCard room={room} key={index} />
                            })
                        )}
                        {allRooms && allRooms.length == 0 && !isInitialRoomsPending && <div className="text-center text-current/50 my-5 text-xl">No room available yet !</div>}
                    </div>
                </div>
            </div>
            <Stats />
        </div>
    )
}

export default Game
