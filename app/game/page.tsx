// page.tsx

"use client"
import { pusherClient } from "@/lib/pusher"
import { Room } from "@/types/room"
import { Button, Modal, ModalBody, ModalContent, Skeleton, useDisclosure } from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
const BtnCreateRoom = dynamic(() => import("@/components/game/BtnCreateRoom"))
const PlayerProfil = dynamic(() => import("@/components/game/PlayerProfil"))
const RoomCard = dynamic(() => import("@/components/game/RoomCard"))
import { useEffect } from "react"
import useSelectedRoom from "@/store/useSelectedRoom"
import { useRoomCountdown } from "@/store/useRoomCountdown"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

const getAllRoom = async () => {
    const res = await fetch("/api/getAllRoom")
    if (!res.ok) {
        throw new Error("Failed to fetch room info")
    }
    const jsonData = await res.json()
    return jsonData
}

const StatsDrawer = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <div className="flex py-4 justify-end min-[1501px]:hidden">
            <Button onPress={onOpen} className="max-w-fit">
                Stats
            </Button>
            <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="p-2">
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-5">
                                            <h1 className="text-3xl">Your Stats</h1>
                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                                                />
                                            </svg>
                                        </div>
                                        <div className="h-[70dvh] overflow-y-auto">
                                            <PlayerProfil />
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

const Stats = () => {
    return (
        <div className="p-5 max-[1500px]:hidden">
            <div className="space-y-10 sticky top-0">
                <div className="flex items-center gap-5">
                    <h1 className="text-3xl">Your Stats</h1>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8">
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
        </div>
    )
}

// NOTE:  Main Component
const Game = () => {
    const router = useRouter()
    const selectedRoom = useSelectedRoom((state) => state.selectedRoom)
    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom)
    const countdown = useRoomCountdown((state) => state.roomCountdown)
    const setCountdown = useRoomCountdown((state) => state.setRoomCountdown)
    const {
        isPending: isInitialRoomsPending,
        data: allRooms,
        refetch: refetchRooms,
    } = useQuery({
        queryKey: ["allRooms"],
        queryFn: async () => {
            const data: Room[] = await getAllRoom()
            if (data) {
                const findedRoom = data.find((r) => r.id === selectedRoom)
                if (!findedRoom) {
                    setSelectedRoom(null)
                } else {
                    setSelectedRoom(findedRoom.id)
                }
            }
            return data
        },
        staleTime: 100 * 60 * 60 * 24,
    })

    useEffect(() => {
        const handleNewRoom = () => {
            refetchRooms()
        }

        pusherClient.subscribe("lobby")
        pusherClient.bind("new-room", handleNewRoom)

        return () => {
            pusherClient.unsubscribe("lobby")
        }
    }, [refetchRooms])

    useEffect(() => {
        if (countdown !== null) {
            if (countdown > 0) {
                const timer = setTimeout(() => {
                    setCountdown(countdown !== null ? countdown - 1 : null)
                }, 1000)
                return () => clearTimeout(timer)
            } else {
                router.push(`/game/${selectedRoom}`)
            }
        }
    }, [selectedRoom, router, countdown, setCountdown])

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
                            className="text-[70dvh]"
                        >
                            {countdown == 0 ? "GO!" : countdown}
                        </motion.span>
                    </div>
                )}
            </AnimatePresence>
            <StatsDrawer /> 
            <div className="xl:col-span-2 p-5 space-y-10">
                <div className="flex items-center gap-5">
                    <h1 className="text-3xl text-center">List of room</h1>
                    <svg className="w-10" viewBox="0 0 20 20">
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
                            allRooms.map((room: Room) => {
                                return <RoomCard room={room} key={room.id} />
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
