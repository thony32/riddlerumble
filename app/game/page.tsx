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

// Game component: Manages the main game interface including room listing, creation, and countdown to game start.
const Game = () => {
    const router = useRouter()
    const selectedRoom = useSelectedRoom((state) => state.selectedRoom)
    const setSelectedRoom = useSelectedRoom((state) => state.setSelectedRoom)
    const [countdown, setCountdown] = useState<number | null>(null)
    const user = useUser((state) => state.user!)

    // Mutation for setting joker
    const setJokerMutation = useMutation({
        mutationKey: ["setJokerMutation"],
        mutationFn: async (user_pseudo: string) => {
            return await setJoker(selectedRoom as string, user_pseudo)
        },
        onError: () => {
            toast.error("Failed to set the joker. Please try again or check the user pseudo.")
        },
    })

    // Query for fetching all rooms
    const {
        isPending: isInitialRoomsPending, // Flag indicating initial room loading state
        data: allRooms,
        refetch: refetchRooms,
    } = useQuery({
        queryKey: ["allRooms"],
        queryFn: async () => {
            const data: Room[] = await getAllRoom()
            if (data) {
                const findedRoom = data.find((r) => checkIfJoined(getUsersPseudo(r.user_pseudo), user.pseudo!))
                if (!findedRoom) {
                    setSelectedRoom(null) // If user has not joined any room, set selected room to null

                } else {
                    setJokerMutation.mutate(findedRoom.user_pseudo)
                    setSelectedRoom(findedRoom.id)
                    if (getUsersPseudo(findedRoom.user_pseudo).length === MAX_PLAYERS) {
                        setCountdown(5)  // Start countdown if room is full
                    }
                }
            }
            // Filter rooms that are not full
            const room_filtered = data.filter((r) => getUsersPseudo(r.user_pseudo).length != MAX_PLAYERS)

            return room_filtered
        },
        staleTime: 100 * 60 * 60 * 24,
    })

    // Effect for listening to room creation socket event
    useEffect(() => {
        socket.on("room-created", () => {
            refetchRooms()
        })
    }, [refetchRooms])


    // Effect for listening to room update socket event
    useEffect(() => {
        socket_update.on("room-updated", () => {
            refetchRooms()
        })
    }, [refetchRooms])

    // Effect for countdown timer
    useEffect(() => {
        if (countdown !== null) {
            if (countdown > 0) {
                const timer = setTimeout(() => {
                    setCountdown((prev) => (prev !== null ? prev - 1 : null))
                }, 1000)
                return () => clearTimeout(timer)
            } else {

                // Remove party start time from local storage and play countdown audio
                localStorage.removeItem(PARTY_START_TIME_KEY)
                // Redirect to game room page
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
                        {allRooms && allRooms.length == 0 && !isInitialRoomsPending &&
                            <div className="w-full flex gap-5 items-center">
                                <svg className="w-1/2 fill-current" zoomAndPan="magnify" viewBox="0 0 600 599.999999">
                                    <defs><clipPath id="22ab88c473">
                                        <path d="M 0 51.75 L 600 51.75 L 600 548.25 L 0 548.25 Z M 0 51.75 " clip-rule="nonzero" /></clipPath></defs>
                                    <g clipPath="url(#22ab88c473)">
                                        <path d="M 538.855469 152.964844 L 419.660156 102.90625 L 327.742188 64.300781 L 349.417969 63.980469 C 351.207031 63.960938 352.925781 64.25 354.589844 64.867188 L 576.246094 147.703125 Z M 419.480469 432.226562 L 347.949219 318.003906 L 536.820312 165.050781 L 589.28125 259.839844 Z M 346.449219 333.410156 L 413.804688 440.960938 C 414.78125 442.523438 416.394531 443.53125 418.222656 443.734375 C 418.441406 443.757812 418.667969 443.769531 418.886719 443.769531 C 420.484375 443.769531 422 443.140625 423.140625 441.988281 L 515.109375 348.617188 L 513.917969 360.949219 C 513.746094 362.742188 512.953125 364.4375 511.691406 365.722656 L 346.449219 533.488281 Z M 115.074219 387.570312 C 114.679688 387.304688 114.425781 386.882812 114.382812 386.410156 L 109.765625 338.484375 L 174.773438 382.015625 L 230.703125 419.46875 L 230.707031 419.46875 C 232.050781 420.371094 233.578125 420.808594 235.09375 420.808594 C 237.039062 420.808594 238.972656 420.078125 240.484375 418.660156 L 337 327.894531 L 337 536.164062 Z M 89.847656 188.332031 C 90.339844 187.878906 91.070312 187.78125 91.664062 188.097656 L 333.703125 318.019531 L 234.921875 410.917969 L 11.257812 261.15625 Z M 366.390625 290.902344 L 342.152344 279.761719 L 309.8125 264.90625 L 309.8125 67.023438 L 529.113281 159.125 L 468.015625 208.609375 Z M 300.359375 265.3125 L 298.664062 266.371094 L 279.628906 278.269531 L 99.71875 181.695312 L 300.359375 68.019531 Z M 341.1875 311.308594 L 316.726562 298.1875 L 296.464844 287.304688 L 289.222656 283.417969 L 305.429688 273.292969 L 354.046875 295.632812 L 358.308594 297.457031 Z M 235.953125 411.605469 C 235.957031 411.613281 235.960938 411.613281 235.964844 411.613281 Z M 257.585938 61.464844 L 289.039062 63.570312 L 92.609375 174.863281 C 90.351562 176.140625 87.699219 176.585938 85.148438 176.109375 L 43 168.226562 L 250.214844 62.972656 C 252.488281 61.8125 255.039062 61.296875 257.585938 61.464844 Z M 599.058594 150.199219 C 599.3125 147.90625 597.984375 145.738281 595.820312 144.933594 L 357.898438 56.015625 C 355.132812 54.980469 352.234375 54.476562 349.273438 54.527344 L 308.027344 55.140625 C 307.046875 55.160156 306.125 55.429688 305.328125 55.902344 C 304.964844 55.90625 304.597656 55.933594 304.234375 55.972656 C 303.367188 55.367188 302.332031 54.988281 301.210938 54.914062 L 258.214844 52.035156 C 253.976562 51.75 249.726562 52.621094 245.933594 54.542969 L 27.96875 165.257812 C 25.921875 166.300781 24.765625 168.519531 25.089844 170.796875 C 25.417969 173.066406 27.152344 174.875 29.40625 175.292969 L 79.832031 184.730469 L 2.789062 256.121094 C 1.152344 257.632812 0.3125 259.78125 0.492188 262 C 0.664062 264.222656 1.828125 266.214844 3.683594 267.457031 L 99.617188 331.695312 L 104.976562 387.316406 C 105.292969 390.617188 107.058594 393.570312 109.816406 395.417969 L 116.214844 399.703125 C 116.222656 399.710938 116.230469 399.714844 116.238281 399.722656 L 274.082031 505.410156 C 274.085938 505.410156 274.085938 505.417969 274.089844 505.417969 L 335.625 546.617188 C 337.28125 547.726562 339.171875 548.269531 341.058594 548.269531 C 343.601562 548.269531 346.128906 547.28125 348.015625 545.359375 L 399.980469 492.601562 C 399.984375 492.59375 399.992188 492.59375 399.992188 492.589844 L 424.523438 467.6875 L 518.421875 372.351562 C 521.207031 369.527344 522.945312 365.804688 523.332031 361.855469 L 525.628906 337.929688 L 596.507812 265.96875 C 599.132812 263.304688 599.703125 259.160156 597.894531 255.882812 L 545.6875 161.554688 L 594.757812 154.640625 C 597.039062 154.320312 598.808594 152.492188 599.058594 150.199219 " fill-opacity="1" fill-rule="nonzero" />
                                    </g>
                                    <path d="M 235.953125 411.605469 L 235.964844 411.613281 C 235.960938 411.613281 235.957031 411.613281 235.953125 411.605469 " fill-opacity="1" fill-rule="nonzero" />
                                </svg>
                                <div>
                                    <h1 className="text-2xl">No party found, create one and enjoy!</h1>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Stats />
        </div>
    )
}

export default Game
